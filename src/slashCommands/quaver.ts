import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../types";
import axios from "axios";

const QuaverCommand : SlashCommand = {
    command: new SlashCommandBuilder()
        .setName("quaver")
        .setDescription("Shows profile stats of a quaver player.")
        .addStringOption(option => {
            return option
                .setName("id")
                .setDescription("Quaver ID.")
                .setRequired(true)
        }),
    execute: async interaction => {
        let quaverId = interaction.options.get("id")?.value;

        const baseUrl = "https://api.quavergame.com/v1";
        const url = `${baseUrl}/users/full/${quaverId}`;

        try {
            const response = await axios.get(url);
            const data = response.data;

            let mode = 1;
            if (data.user.keys7.stats.total_score > data.user.keys4.stats.total_score) {
                mode = 2;
            }

            const scoreUrl = `https://api.quavergame.com/v1/users/scores/best?id=${quaverId}&mode=${mode}&limit=1`;
            const score = await axios.get(scoreUrl);
            const scoreData = score.data;

            const finalScore = Math.round(scoreData.scores[0].performance_rating * 100) / 100

            const diff = scoreData.scores[0].map.difficulty_name;
            const artist = scoreData.scores[0].map.artist;
            const title = scoreData.scores[0].map.title;

            const embed = new EmbedBuilder()
            .setAuthor({ name: `${data.user.info.username}`, iconURL: data.user.info.avatar_url || undefined})
            .setColor("Blue")
            .setTitle(`Quaver Stats for ${data.user.info.username} :flag_${data.user.info.country.toLowerCase()}:`)
            .setURL(`https://quavergame.com/user/${data.user.info.id}`)
            .setThumbnail(`${data.user.info.avatar_url}`)
            .addFields(
                { name: "4K Total Score", value: `\`${data.user.keys4.stats.total_score.toLocaleString()}\``, inline: true },
                { name: "4K Global Rank", value: `#${data.user.keys4.globalRank.toLocaleString()}`, inline: true },
                { name: "4K Country Rank", value: `#${data.user.keys4.countryRank.toLocaleString()}`, inline: true },
            )
            .addFields(
                { name: "7K Total Score", value: `\`${data.user.keys7.stats.total_score.toLocaleString()}\``, inline: true},
                { name: "7K Global Rank", value: `#${data.user.keys7.globalRank.toLocaleString()}`, inline: true},
                { name: "7K Country Rank", value: `#${data.user.keys7.countryRank.toLocaleString()}`, inline: true },
            )
            .addFields(
                { name: "Highest Rated Play (depending on which mode has higher total score)", value: `\`${finalScore}\` on [${artist} - ${title} (${diff})](https://quavergame.com/mapset/${scoreData.scores[0].map.mapset_id})`, inline: true },
            )
            .setTimestamp()
            .setFooter({ text: `Requested by ${interaction.user.username}#${interaction.user.discriminator}`, iconURL: interaction.user.avatarURL() || undefined })
            interaction.reply({ embeds: [embed] })
        } catch (error) {
            interaction.reply("An error occurred while trying to retrieve data from the Quaver API.");
            console.error(error);
        }
    },
    cooldown: 10
}

export default QuaverCommand;
