import { TextChannel, MessageEmbed } from "discord.js";
import { Command } from "../../structures/Command";
import axios from "axios";
export default new Command({
    
    name: 'hentai',
    description: 'Shows hentai pictures',
    run: async ({ interaction, client }) => {
        const currentChannel = interaction.channel as TextChannel
       if(currentChannel.nsfw){
        axios.get(`https://nekobot.xyz/api/image?type=hentai`)
        .then(res => {
            const embed = new MessageEmbed()
            .setTitle('hentai')
            .setImage(res.data.message)
            .setColor('RANDOM')
            interaction.followUp({embeds: [embed]})
        }).catch(err => {
            interaction.followUp({content: 'An error has occured'})
            console.log(err)
        })

       } else {
        return interaction.followUp({ ephemeral: true, content: `This channel is not marked as NSFW.` });
       }
    }
})