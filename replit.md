# EarthMC Discord Bot

## Overview
A Discord bot that connects to the EarthMC API to display nation statistics from the Aurora world. The bot uses slash commands to fetch and display comprehensive information about nations including residents, towns, territory, balance, allies, enemies, and more.

## Recent Changes
- 2025-10-18: Initial project setup with Node.js and Discord connector integration
- 2025-10-18: Installed discord.js and axios dependencies
- 2025-10-18: Implemented bot with slash commands for nation statistics

## Project Architecture
- **Language**: Node.js (v20) with JavaScript
- **Framework**: Discord.js v14 for bot functionality
- **API**: EarthMC API v3 (https://api.earthmc.net/v3/aurora/)
- **Integration**: Discord Connector for secure token management
- **HTTP Client**: Axios for API requests

## Features
- `/nation <name>` - Display comprehensive nation statistics
- Formatted Discord embeds with color-coded information
- Error handling for invalid nation names and API failures
- Lists all towns within a nation
- Shows nation details (king, capital, allies, enemies, residents, territory)

## API Endpoints Used
- GET `https://api.earthmc.net/v3/aurora/nations` - List all nations
- POST `https://api.earthmc.net/v3/aurora/nations` - Get detailed nation data

## File Structure
- `src/bot.js` - Main bot entry point with Discord client setup
- `src/commands/nation.js` - Nation statistics command implementation
- `src/utils/earthmc.js` - EarthMC API client utilities
- `package.json` - Project dependencies and scripts
