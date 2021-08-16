const Discord = require("discord.js");
const WOKCommands = require('wokcommands')
const client = new Discord.Client();
const config = require("./config.json");
const guildId = '841406860556763187'
const mongo = require('./mongo')

client.on("ready", async () => {
    console.log(`Bot foi iniciado, com ${client.users.cache.size} usuários, em ${client.channels.cache.size} canais, em ${client.guilds.cache.size} servidores.`);
    client.user.setActivity(`Servindo ${client.guilds.cache.size} servidor`);

    await mongo().then((mongoose) => {
        try{
            console.log('Conexão estabelecida com o banco de dados')
        } finally{
            mongoose.connection.close()
        }
    })
    
    new WOKCommands(client, {
        commandsDir: 'commands',
        testServers: [guildId],
        showWarns: false,
    })
});

client.on("guildMemberAdd", async member =>{
    
    let guild = client.guilds.cache.get("841406860556763187");
    let canal = client.channels.cache.get("841417097447080017");
    if(guild != member.guild){
        return console.log("Você não é do meu servidor! Pega tua visão doidão.")
    }else{
        let embed = new Discord.MessageEmbed()
        .setColor('#2ba61e')
        .setAuthor(member.user.tag, member.user.displayAvatarURL())
        .setTitle(`🤝 Boas-vindas 🤝`)
        .setImage('https://media.tenor.com/images/b0f6593607c950789d160f249ce71cf5/tenor.gif')
        .setDescription(`${member.user}, boas vindas ao servidor ${guild.name}! Atualmente estamos com ${member.guild.memberCount} membros.`)
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024}))
        .setFooter('ID do Usuário: ' + member.user.id)
        .setTimestamp();

        await canal.send(embed);
    }
});

client.on("guildMemberRemove", async member => {
    let canal = client.channels.cache.get("841417097447080017");

    const embed = new Discord.MessageEmbed()
    .setColor("#d60000")
    .setAuthor(member.user.tag, member.user.displayAvatarURL())
    .setTitle("👋 Você foi kickado do servidor 👋")
    .setDescription(`${member.user} foi expulso do servidor devido a algum incoveniente! O servidor agora conta com ${member.guild.memberCount} membros.`)
    .setImage("https://media2.giphy.com/media/xUPGcGyYhQTYtDtwBy/giphy.gif")
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024}))
    .setFooter('ID do Usuário: ' + member.user.id)
    .setTimestamp();

    await canal.send(embed);

});

client.login(config.token);