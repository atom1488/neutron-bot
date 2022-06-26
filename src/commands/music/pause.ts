import { Queue } from "discord-music-player";
import { Command } from "../../structures/Command";

export default new Command({
    name: 'pause',
    description: 'Pause/resume the playing song',
    run: async({ interaction, client }) => {

        if (!interaction.member.voice.channel) return interaction.followUp({ ephemeral: true, content: 'You need to be in a voice channel to perform this command.'});

        if (interaction.guild?.me?.voice.channel) {
            if (interaction.guild.me.voice.channelId != interaction.member.voice.channelId) return interaction.followUp({ ephemeral: true, content: `The bot is in an other voice channel.` });
        }

        const queue: Queue = client.player.getQueue((interaction.guildId) as string) as Queue;

        if (!queue || !queue.isPlaying) return interaction.followUp({ ephemeral: true, content: `There is no music playing right now` });

        if (queue.paused) {
            queue.setPaused(false);
            return interaction.followUp({ content: 'Song has been resumed.' });
        }
        queue.setPaused(true);

        interaction.followUp({ content: 'Song has been paused.' });
    }
});