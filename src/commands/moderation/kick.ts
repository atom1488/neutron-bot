import {
  ButtonInteraction,
  GuildMember,
  InteractionCollector,
  MessageActionRow,
  MessageButton,
  MessageComponentInteraction,
} from 'discord.js'
import { Command } from '../../structures/Command'
import { ExtendedInteraction } from '../../typings/Command'
export default new Command({
  name: 'kick',
  description: 'kick a user',
  userPermissions: ['KICK_MEMBERS'],
  options: [
    {
      name: 'target',
      type: 'USER',
      description: 'User to kick',
      required: true,
    },
    {
      name: 'reason',
      type: 'STRING',
      description: 'Reason for the kick',
      required: false,
    },
  ],
  run: async ({ interaction }) => {
    const memberAya: GuildMember = interaction.options.getMember('target') as GuildMember
    const reason: string = interaction.options.getString('reason') || 'No reason given'
    if (!interaction.guild.me.permissions.has('ADMINISTRATOR'))
      return interaction.followUp({ content: `I don't have \`ADMINISTRATOR\` permission.` })

    if (interaction.member.roles.highest.rawPosition >= interaction.guild.me.roles.highest.rawPosition) {
      return interaction.followUp({ content: `The user you are trying to kick is superior to the bot` })
    }
    if (interaction.member.roles.highest.rawPosition <= memberAya.roles.highest.rawPosition) {
      return interaction.followUp({ content: `You can't kick someone with a role higher than yours.` })
    }
    const row: MessageActionRow = new MessageActionRow().addComponents(
      new MessageButton().setCustomId('kickYes').setLabel('Yes').setStyle('SUCCESS'),
      new MessageButton().setCustomId('kickNo').setLabel('No').setStyle('DANGER')
    )

    const kickInteraction: ExtendedInteraction = interaction
    kickInteraction.followUp({ content: `Are you sure you want to kick ${memberAya.user.tag}?`, components: [row] })
    setTimeout(() => {
      kickInteraction.deleteReply().catch(() => {})
    }, 10000)
    const collector: InteractionCollector<MessageComponentInteraction> =
      kickInteraction.channel.createMessageComponentCollector({ time: 10000 })
    collector.on('collect', async (button: ButtonInteraction) => {
      if (button.customId === 'kickYes') {
        button.deferUpdate()
        if (button.user.id !== interaction.user.id) return
        memberAya.kick(reason).catch(() => {})
        kickInteraction.deleteReply().catch(() => {})
        kickInteraction.followUp({
          content: `${memberAya.user.tag} has been kicked by ${interaction.member.user.username}`,
        })
      }
      if (button.customId === 'kickNo') {
        if (button.user.id !== interaction.user.id) return
        kickInteraction.deleteReply().catch(() => {})
      }
    })
  },
})
