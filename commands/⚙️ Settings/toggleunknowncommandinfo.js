const {
  MessageEmbed
} = require("discord.js");
const config = require(`${process.cwd()}/botconfig/config.json`);
var ee = require(`${process.cwd()}/botconfig/embed.json`);
const emoji = require("../../botconfig/emojis.json");
module.exports = {
  name: "toggleunknowncommandinfo",
  aliases: ["toggleunknowncmdinfo", "toggleunknowninfo", "unknowncmdinfo", "unknowninfo", "unknowncommandinfo"],
  category: "⚙️ Settings",
  description: "Toggles if the Bot should send you an Informational Message, when the Command is NOT FOUND",
  usage: "toggleunknowncommandinfo",
  type: "bot",
  run: async (client, message, args, cmduser, text, prefix) => {
    
    let es = client.settings.get(message.guild.id, "embed");let ls = client.settings.get(message.guild.id, "language")
    try {

      client.settings.set(message.guild.id, !client.settings.get(message.guild.id, "unkowncmdmessage"), `unkowncmdmessage`);
      return message.reply({embeds : [new MessageEmbed()
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon && (es.footericon.includes("http://") || es.footericon.includes("https://")) ? es.footericon : client.user.displayAvatarURL() : null)
        .setFooter(client.getFooter(es))
        .setTitle(eval(client.la[ls]["cmds"]["settings"]["toggleunknowncommandinfo"]["variable1"]))
        .setDescription(`${client.settings.get(message.guild.id, "unkowncmdmessage") ? "I will now send an Information when the Command is not found" : "I will not send Information of Unknown Commands"}`.substr(0, 2048))
      ]});
    } catch (e) {
      console.log(String(e.stack).grey.bgRed)
      return message.reply({embeds :[new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(client.getFooter(es))
        .setTitle(client.la[ls].common.erroroccur)
        .setDescription(eval(client.la[ls]["cmds"]["settings"]["toggleunknowncommandinfo"]["variable2"]))
       ]} );
    }
  }
};
/**
 * @INFO
 * //MODIFIED BY PHV DEVELOPMENT. | https://discord.gg/KCJBVaFGj5
 * @INFO
 * Read out LICENSE.MD
 * @INFO
//2021-2024
 * @INFO
 */
