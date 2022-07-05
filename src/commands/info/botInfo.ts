import { Command } from '../../structures/Command'
import { MessageEmbed } from 'discord.js'
import moment, { Duration, Moment } from 'moment'
import { version, authors } from '../../../package.json'
export default new Command({
  name: 'botinfo',
  description: 'Replies with bot information',
  run: async ({ client, interaction }) => {
    const timeCurrent: Duration = moment.duration(client.uptime)
    const createdDate: Moment = moment(client.user.createdAt)
    const BotInformation: MessageEmbed = new MessageEmbed()
      .setColor('#ee6f71')
      .setThumbnail(`${client.user.displayAvatarURL({ dynamic: true })}`)
      .setTitle('Bot Information')
      .addFields(
        { name: 'Owners', value: authors.join(', '), inline: true },
        { name: 'Version', value: `${version}`, inline: true },
        {
          name: 'Created on',
          value: `${createdDate.format('dddd, MMMM Do YYYY, h:mm:ss a')} (<t:${Math.round(
            client.user.createdTimestamp / 1000
          )}:R>)`,
          inline: true,
        },
        { name: 'Guilds', value: `${client.guilds.cache.size}`, inline: true },
        { name: 'Total Users', value: `${client.users.cache.size}`, inline: true },
        { name: '\u200b', value: '\u200b', inline: true },
        {
          name: 'Uptime',
          value:
            `${timeCurrent.hours()} hours ` + `${timeCurrent.minutes()} minutes ` + `${timeCurrent.seconds()} seconds`,
          inline: true,
        },
        { name: 'Language', value: 'TypeScript', inline: true },
        {
          name: 'Invite Bot',
          value:
            'https://discord.com/oauth2/authorize?client_id=986815196376989756&permissions=8&scope=applications.commands%20bot',
        } // Mettre un link raccourcis comme https://neutronbot.jsp/invite et aussi mettre le lien du site
      )
    interaction.followUp({ embeds: [BotInformation] })
  },
})
