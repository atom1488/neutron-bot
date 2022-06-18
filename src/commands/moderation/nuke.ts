import {BaseGuildTextChannel, ButtonInteraction, InteractionCollector, Message, MessageActionRow, MessageButton, MessageComponentInteraction} from "discord.js";
import { Command } from "../../structures/Command";
import {ExtendedInteraction} from "../../typings/Command";

export default new Command({
    name: 'nuke',
    description: 'delete the channel and clone it',
    userPermissions: ['MANAGE_CHANNELS'],
    run: async ({ interaction }) => {

        if (!interaction.guild.me.permissions.has('ADMINISTRATOR'))
            return interaction.followUp({ content: `I don't have \`ADMINISTRATOR\` permission.` });

        const row: MessageActionRow = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId('nukeYes')
                .setLabel('Yes')
                .setStyle('SUCCESS'),

            new MessageButton()
                .setCustomId('nukeNo')
                .setLabel('No')
                .setStyle('DANGER')
        );

        const nukeInteraction: ExtendedInteraction = interaction;

        nukeInteraction.followUp({ content: `:warning: Are you sure you want to nuke ?`, components: [row] })
        
        setTimeout(() => { nukeInteraction.deleteReply().catch(() => {}) }, 10000);

        const collector: InteractionCollector<MessageComponentInteraction> = nukeInteraction.channel.createMessageComponentCollector({ time: 10000 });

        collector.on('collect', async (button: ButtonInteraction) => {
            if (button.customId === 'nukeYes')
            {
                button.deferUpdate();
                if (button.user.id !== interaction.user.id) return;
                const buttonChannel: BaseGuildTextChannel = button.channel as BaseGuildTextChannel;
                const position: number = buttonChannel.rawPosition;
                const channelName: string = buttonChannel.name;
                const newChannel: BaseGuildTextChannel = await buttonChannel.clone().catch(() => {}) as BaseGuildTextChannel;
                buttonChannel.delete().catch(() => {});

                newChannel.setPosition(position);
                newChannel.send({ content: `\`${channelName}\` was nuked by **${interaction.user.username}**` });
            }

            if (button.customId === 'nukeNo')
            {
                button.deferUpdate();
                if (button.user.id !== interaction.user.id) return;
                const buttonMessage: Message = button.message as Message;
                buttonMessage.delete().catch(() => {});
            }

        });
    }
});
