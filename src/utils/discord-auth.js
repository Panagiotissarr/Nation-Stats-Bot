import { Client, GatewayIntentBits } from 'discord.js';

export async function createDiscordClient() {
  const token = process.env.DISCORD_BOT_TOKEN;

  if (!token) {
    throw new Error('DISCORD_BOT_TOKEN environment variable is not set');
  }

  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds, 
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent
    ]
  });

  await client.login(token);
  return client;
}
