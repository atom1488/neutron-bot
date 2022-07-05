import { Command } from "../../structures/Command";
import { MessageEmbed } from "discord.js";
import { Queue, Song } from "discord-music-player";

export default new Command({
    name: "play",
    description: "Plays a song",
    options: [
        {
            name: "query",
            type: "STRING",
            description: "The song you want to play",
            required: true
        }
    ],
    run: async ({ interaction, client }) => {
        if (!interaction.member.voice.channel)
            return interaction.followUp({
                ephemeral: true,
                content: `You need to be in a voice channel to use this command.`
            });

        if (interaction.guild.me.voice.channel) {
            if (interaction.guild.me.voice.channelId != interaction.member.voice.channelId)
                return interaction.followUp({
                    ephemeral: true,
                    content: `You are not in the same voice channel as the bot.`
                });
        }

        const query: string = interaction.options.getString("query", true);

        if (!query.length)
            return interaction.followUp({ ephemeral: true, content: `You need to enter a valid query.` });

        const queue: Queue = client.player.createQueue(interaction.guildId, {
            data: interaction
        });

        await queue.join(interaction.member.voice.channel);

        const song: Song = (await queue
            .play(query, {
                requestedBy: interaction.user
            })
            .catch((_) => {
                const guildQueue: Queue = client.player.getQueue(interaction.guild.id);
                if (!guildQueue) return queue.stop();
            })) as Song;

        if (!song)
            return interaction.followUp({
                content: `Can't play the song. (Only YouTube and Spotify are available for now)`,
                ephemeral: true
            });

        const embed: MessageEmbed = new MessageEmbed()
            .setColor("RED")
            .setTitle(":notes: Song Added")
            .setDescription(
                `:musical_note: [${song.name}](${song.url}) - \`${song.duration}\` has beed added! [${song.requestedBy}]`
            )
            .setThumbnail(song.thumbnail);

        interaction.followUp({ embeds: [embed] });
    }
});
