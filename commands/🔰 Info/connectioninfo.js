const Discord = require("discord.js");
const {
  MessageEmbed
} = require("discord.js");
const config = require(`${process.cwd()}/botconfig/config.json`);
var ee = require(`${process.cwd()}/botconfig/embed.json`);
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
const {
  GetUser,
  GetGlobalUser, handlemsg
} = require(`${process.cwd()}/handlers/functions`)
const fetch = require("node-fetch")
module.exports = {
  name: "connectioninfo",
  aliases: ["coinfo"],
  category: "🔰 Info",
  description: "Get Information of your Connection",
  usage: "connectioninfo",
  type: "user",
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed");
    let ls = client.settings.get(message.guild.id, "language")
    
		try {
      var user;
      if(args[0]){
        try {
          if(args[1] && args[1].toLowerCase() == "global"){
            args.pop()
            user = await GetGlobalUser(message, args)
          } else {
            user = await GetUser(message, args)
          }
        } catch (e){
          console.log(e.stack ? String(e.stack).grey : String(e).grey)
          return message.reply(client.la[ls].common.usernotfound)
        }
      } else{
        user = message.author;
      }
      let member = message.guild.members.cache.get(user.id) || await message.guild.members.fetch(user.id).catch(() => {}) || false;
      
      if(!member) return message.reply(":x: **This User is not a Member of this Guild!**")
      if(!member.voice || !member.voice.channel) return message.reply(":x: **This User is not Connected to a Voicechannel!**")
      

      const embed = new Discord.MessageEmbed()
        .setTitle(`Connection Info of: \`${user.tag}\``)
        .addField('<a:Arrow:1259399777351897108> **Channel**', `> **${member.voice.channel.name}** ${member.voice.channel}`, true)
        .addField('<a:Arrow:1259399777351897108> **Channel-ID**', `> \`${member.voice.channel.id}\``, true)
        .addField('<a:Arrow:1259399777351897108> **Members in there**', `> \`${member.voice.channel.members.size} total Members\``, true)
        .addField('<a:Arrow:1259399777351897108> **Full Channel?**', `> ${member.voice.channel.full ? "✅" : "❌"}`, true)
        .addField('<a:Arrow:1259399777351897108> **Bitrate**', `> ${member.voice.channel.bitrate}`, true)
        .addField('<a:Arrow:1259399777351897108> **User join limit**', `> \`${member.voice.channel.userLimit != 0 ? member.voice.channel.userLimit : "No limit!"}\``, true)
      
      message.reply({
        embeds: [embed]
      });
    } catch (e) {
      console.log(String(e.stack).grey.bgRed)
      return message.reply({embeds: [new MessageEmbed()
        .setColor(es.wrongcolor)
        .setFooter(client.getFooter(es))
        .setTitle(client.la[ls].common.erroroccur)
        .setDescription(eval(client.la[ls]["cmds"]["info"]["color"]["variable2"]))
      ]});
    }
  }
}
/**
 * @INFO
 * //MODIFIED BY PHV DEVELOPMENT. | https://discord.gg/KCJBVaFGj5
 * @INFO
 * Read out LICENSE.MD
 * @INFO
//2021-2024
 * @INFO
 */
