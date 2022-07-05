import { TextChannel, MessageEmbed } from 'discord.js'
import { Command } from '../../structures/Command'
import axios from 'axios'
export default new Command({
  name: 'gelbooru',
  description: 'Shows gelbooru  pictures, need to precise the tag',
  options: [
    {
      name: 'tag',
      description: 'The tag to search',
      required: true,
      type: 'STRING',
    },
  ],
  run: async ({ interaction, client }) => {
    const bannedWords: Array<string> = ['loli']
    const currentChannel = interaction.channel as TextChannel
    if (currentChannel.nsfw) {
      var tag: string = interaction.options.getString('tag')
      // check if tag equals to bannedWords
      // compare a string to an array
      if (bannedWords.includes(tag)) {
        tag = '1girls'
      }
      const random = Math.floor(Math.random() * 1000)
      axios
        .get(`https://gelbooru.com/index.php?page=dapi&s=post&q=index&tag=${tag}&limit=1000&json=1`, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then((res) => {
          const file_url: string = res.data.post[random].file_url
          const embed = new MessageEmbed().setTitle(`Gelbooru : **${tag}**`).setImage(file_url).setColor('RANDOM')
          interaction.followUp({ embeds: [embed] })
        })
        .catch((err) => {
          interaction.followUp({ content: 'An error has occured' })
          console.log(err)
        })
    } else {
      return interaction.followUp({ ephemeral: true, content: `This channel is not marked as NSFW.` })
    }
  },
})
