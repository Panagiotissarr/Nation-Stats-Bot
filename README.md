# EarthMC Discord Bot

A Discord bot that connects to the EarthMC API to display nation statistics from the Aurora world.

## Features

- **`/nation <name>`** - Display comprehensive statistics for any EarthMC nation
  - Nation leader and capital city
  - Number of residents and towns
  - Territory size (chunks)
  - Treasury balance
  - Founded date
  - Capital coordinates
  - Allies and enemies
  - List of all towns in the nation
  - Nation status flags

## Setup Instructions

### 1. Create a Discord Bot

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application" and give it a name
3. Go to the "Bot" section in the left sidebar
4. Click "Reset Token" to generate a new bot token (save this for later)
5. **Note:** No special privileged intents are required for basic functionality

### 2. Invite the Bot to Your Server

1. Go to the "OAuth2" → "URL Generator" section
2. Select the following scopes:
   - `bot`
   - `applications.commands`
3. Select the following bot permissions:
   - `Send Messages`
   - `Use Slash Commands`
4. Copy the generated URL and open it in your browser
5. Select your server and authorize the bot

### 3. Configure the Bot

1. Add your Discord Bot Token to Replit Secrets:
   - Key: `DISCORD_BOT_TOKEN`
   - Value: Your bot token from step 1

### 4. Run the Bot

The bot will automatically start when you run the project. You should see:
```
✅ Bot is ready! Logged in as YourBotName#1234
📊 Serving X server(s)
Successfully reloaded application (/) commands.
🎮 Bot is ready and listening for commands!
```

## Usage

Once the bot is running and in your server, you can use slash commands:

### `/nation <name>`

Get detailed statistics for any nation on EarthMC Aurora.

**Example:**
```
/nation Yukon
```

This will display:
- Leader (King)
- Capital city
- Founded date
- Number of residents
- Number of towns
- Territory size
- Treasury balance
- Capital location coordinates
- Allies and enemies lists
- Complete list of towns in the nation

## API Reference

This bot uses the [EarthMC API v3](https://earthmc.net/docs/api) to fetch data.

- **Base URL:** `https://api.earthmc.net/v3/aurora`
- **Endpoints Used:**
  - `POST /nations` - Fetch detailed nation data

## Project Structure

```
.
├── src/
│   ├── bot.js                 # Main bot entry point
│   ├── commands/
│   │   └── nation.js          # Nation statistics command
│   └── utils/
│       ├── discord-auth.js    # Discord client authentication
│       └── earthmc.js         # EarthMC API utilities
├── package.json               # Project dependencies
└── README.md                  # This file
```

## Dependencies

- **discord.js** (v14) - Discord bot framework
- **axios** - HTTP client for API requests

## Troubleshooting

**Bot doesn't respond to commands:**
- Make sure the bot is online (check the bot's status in Discord)
- Verify you've enabled the MESSAGE CONTENT INTENT in the Discord Developer Portal
- Ensure the bot has permission to send messages in the channel

**"Nation not found" error:**
- Check the spelling of the nation name
- Nation names are case-sensitive
- Make sure the nation exists on EarthMC Aurora

**Bot won't start:**
- Verify your `DISCORD_BOT_TOKEN` is correct
- Check that all required intents are enabled
- Review the console logs for error messages

## Support

For issues with:
- **EarthMC API:** Visit [earthmc.net/docs/api](https://earthmc.net/docs/api)
- **Discord Bot Development:** Visit [discord.js.org](https://discord.js.org)
