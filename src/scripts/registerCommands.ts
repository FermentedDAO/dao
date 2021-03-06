import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { readdirSync } from "fs";

import config from "../config";

const commands = [];
const commandFiles = readdirSync(`${__dirname}/../commands`).filter(f => f.endsWith(".js"));

for (const file of commandFiles) {
	/* eslint-disable-next-line @typescript-eslint/no-var-requires */
	const command = require(`${__dirname}/../commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: "9" }).setToken(config.BOT_TOKEN);

(async () => {
	try {
		console.log("Started refreshing application (/) commands.");

		await rest.put(
			Routes.applicationGuildCommands(
				config.CLIENT_ID,
				config.GUILD_ID,
			),
			{ body: commands },
		);

		console.log("Successfully reloaded application (/) commands.");
	} catch (error) {
		console.error(error);
	}
})();
