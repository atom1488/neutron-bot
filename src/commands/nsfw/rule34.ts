import { Command } from "../../structures/Command";
import axios from "axios";
import {MessageEmbed} from "discord.js";

export default new Command({
    'name': "rule34",
    'description': "Shows rule34 pictures, need to precise the tag",
    'options': [{
        'name': 'tag',
        'description': 'The tag to search',
        'required': true,
        'type': 'STRING'

}],
run: async ({ interaction, client }) => {
var tag: string = interaction.options.getString('tag');
axios.get(`https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&limit=1000&tags=${tag}&json=1`, { headers: { "Content-Type":"application/json" } })
.then(res => {
    const random = Math.floor(Math.random() * 1000)
    const file_url:  string = res.data[random].file_url
    const embed = new MessageEmbed()
    .setTitle(`Rule34 : **${tag}**`)
    .setImage(file_url)
    .setColor('RANDOM')
   interaction.followUp({embeds: [embed]})
}).catch(err => {
    interaction.followUp({content: 'An error has occured'})
    console.log(err)
})
}
})