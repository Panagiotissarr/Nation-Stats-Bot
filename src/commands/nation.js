import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { getNations, formatTimestamp, formatCoordinates } from '../utils/earthmc.js';

export const data = new SlashCommandBuilder()
  .setName('nation')
  .setDescription('Get statistics for an EarthMC nation')
  .addStringOption(option =>
    option.setName('name')
      .setDescription('The name of the nation')
      .setRequired(true));

export async function execute(interaction) {
  const nationName = interaction.options.getString('name');
  
  await interaction.deferReply();

  try {
    const nations = await getNations([nationName]);
    
    if (!nations || nations.length === 0) {
      return await interaction.editReply({
        content: `❌ Nation "${nationName}" not found. Please check the spelling and try again.`,
        ephemeral: true
      });
    }

    const nation = nations[0];
    
    const embed = new EmbedBuilder()
      .setColor(nation.dynmapColour ? `#${nation.dynmapColour}` : '#0099ff')
      .setTitle(`🏛️ ${nation.name}`)
      .setDescription(nation.board || 'No nation board set')
      .setTimestamp();

    if (nation.wiki) {
      embed.setURL(nation.wiki);
    }

    embed.addFields(
      { 
        name: '👑 Leader', 
        value: `${nation.king.name}`, 
        inline: true 
      },
      { 
        name: '🏰 Capital', 
        value: nation.capital.name, 
        inline: true 
      },
      { 
        name: '📅 Founded', 
        value: formatTimestamp(nation.timestamps.registered), 
        inline: true 
      },
      { 
        name: '👥 Residents', 
        value: `${nation.stats.numResidents} residents`, 
        inline: true 
      },
      { 
        name: '🏘️ Towns', 
        value: `${nation.stats.numTowns} towns`, 
        inline: true 
      },
      { 
        name: '🗺️ Area', 
        value: `${nation.stats.numTownBlocks} chunks`, 
        inline: true 
      }
    );

    if (nation.stats.balance !== undefined) {
      embed.addFields({
        name: '💰 Treasury',
        value: `${nation.stats.balance.toLocaleString()} gold`,
        inline: true
      });
    }

    if (nation.capital.coordinates?.spawn) {
      embed.addFields({
        name: '📍 Capital Location',
        value: formatCoordinates(nation.capital.coordinates.spawn),
        inline: false
      });
    }

    if (nation.allies && nation.allies.length > 0) {
      const allyNames = nation.allies.map(a => a.name).join(', ');
      embed.addFields({
        name: `🤝 Allies (${nation.allies.length})`,
        value: allyNames.length > 1024 ? allyNames.substring(0, 1021) + '...' : allyNames,
        inline: false
      });
    }

    if (nation.enemies && nation.enemies.length > 0) {
      const enemyNames = nation.enemies.map(e => e.name).join(', ');
      embed.addFields({
        name: `⚔️ Enemies (${nation.enemies.length})`,
        value: enemyNames.length > 1024 ? enemyNames.substring(0, 1021) + '...' : enemyNames,
        inline: false
      });
    }

    if (nation.towns && nation.towns.length > 0) {
      const townNames = nation.towns.map(t => t.name).join(', ');
      embed.addFields({
        name: `🏘️ Towns List (${nation.towns.length})`,
        value: townNames.length > 1024 ? townNames.substring(0, 1021) + '...' : townNames,
        inline: false
      });
    }

    const statusFlags = [];
    if (nation.status.isPublic) statusFlags.push('🌍 Public');
    if (nation.status.isOpen) statusFlags.push('🚪 Open');
    if (nation.status.isNeutral) statusFlags.push('☮️ Neutral');
    
    if (statusFlags.length > 0) {
      embed.addFields({
        name: '🏷️ Status',
        value: statusFlags.join(' • '),
        inline: false
      });
    }

    embed.setFooter({ text: `EarthMC Aurora • ${nation.uuid}` });

    await interaction.editReply({ embeds: [embed] });

  } catch (error) {
    console.error('Error executing nation command:', error);
    await interaction.editReply({
      content: '❌ An error occurred while fetching nation data. Please try again later.',
      ephemeral: true
    });
  }
}
