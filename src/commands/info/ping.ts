import { Command } from "../../structures/Command";

export default new Command({
    name: 'ping',
    description: 'replies with bot\'s ping',
    run: async({ client, interaction }) => {
        interaction.followUp({ content: `The bot's ping is \`${client.ws.ping}ms\`` });
    }
});
