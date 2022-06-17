import { Command } from "../../structures/Command";
import { CommandInteractionResolvedData, GuildMember, MemberMention, MessageEmbed, User } from "discord.js";
import moment,{ Moment } from "moment";

export default new Command({
    name: "userinfo",
    description: "Replies user information.",
    options: [{
        name: "target",
        type: "USER",
        description: "Show user information",
        required: false,
    }],

    run: async ({ interaction }) => {
    const user: User = interaction.options.getUser("target") || interaction.user
    const member: GuildMember = interaction.options.getMember("target") as GuildMember || interaction.member as GuildMember
    const TimeFull: Moment = moment(user.createdAt);
    const profilePicture: string = user.displayAvatarURL({ dynamic: true, size: 2048, format: "png" });
    const UserEmbed: MessageEmbed = new MessageEmbed()
    .setAuthor({
        name: user.username,
        iconURL: user.displayAvatarURL({ dynamic: true, size: 2048, format: "png" }),
    })
    .setColor("#ee6f71")
    .setThumbnail(profilePicture)
    .addFields(
        {
        name: "Name",
        value: `<@${user.id}>`,
        inline: true,
        },
        {
        name: "ID",
        value: `${user.id}`,
        inline: true,

        },
        {"name": "\u200b", "value": "\u200b", inline: true},
        {
        name: "Created at",
        value: `${TimeFull.format("dddd, MMMM Do YYYY, h:mm:ss a")} (<t:${Math.round(user.createdTimestamp / 1000)}:R>)`,
        inline: false,
        },
        {
        name: "Joined at",
        value: `${member.joinedAt}`,
        inline: false,
        }
    
    )
    interaction.followUp({ embeds: [UserEmbed] });
    }

});
