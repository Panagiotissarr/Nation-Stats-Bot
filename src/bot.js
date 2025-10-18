import { REST, Routes } from 'discord.js';
import { createDiscordClient } from './utils/discord-auth.js';
import * as nationCommand from './commands/nation.js';

const commands = [nationCommand];

async function deployCommands(client) {
  const commandData = commands.map(cmd => cmd.data.toJSON());
  
  const rest = new REST({ version: '10' }).setToken(client.token);

  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationCommands(client.user.id),
      { body: commandData },
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error('Error deploying commands:', error);
  }
}

async function startBot() {
  try {
    console.log('🤖 Starting EarthMC Discord Bot...');
    console.log('🔑 Authenticating with Discord...');
    
    const client = await createDiscordClient();
    console.log('✅ Authentication successful, waiting for ready event...');

    client.once('ready', async () => {
      console.log(`✅ Bot is ready! Logged in as ${client.user.tag}`);
      console.log(`📊 Serving ${client.guilds.cache.size} server(s)`);
      
      if (client.guilds.cache.size === 0) {
        console.log('⚠️  Warning: Bot is not in any servers yet!');
        console.log('📋 Invite the bot to your server using the Discord Developer Portal');
      }
      
      await deployCommands(client);
      console.log('🎮 Bot is ready and listening for commands!');
    });

    client.on('interactionCreate', async interaction => {
      if (!interaction.isChatInputCommand()) return;

      const command = commands.find(cmd => cmd.data.name === interaction.commandName);

      if (!command) {
        console.warn(`No command matching ${interaction.commandName} was found.`);
        return;
      }

      try {
        console.log(`📝 Executing command: /${interaction.commandName} by ${interaction.user.tag}`);
        await command.execute(interaction);
      } catch (error) {
        console.error(`Error executing ${interaction.commandName}:`, error);
        
        const errorMessage = {
          content: '❌ There was an error executing this command!',
          ephemeral: true
        };

        if (interaction.replied || interaction.deferred) {
          await interaction.followUp(errorMessage);
        } else {
          await interaction.reply(errorMessage);
        }
      }
    });

    client.on('error', error => {
      console.error('Discord client error:', error);
    });

    client.on('warn', warning => {
      console.warn('Discord client warning:', warning);
    });

    client.on('disconnect', () => {
      console.log('🔌 Bot disconnected from Discord');
    });

  } catch (error) {
    console.error('❌ Failed to start bot:', error);
    console.error('Error stack:', error.stack);
    process.exit(1);
  }
}

startBot();
