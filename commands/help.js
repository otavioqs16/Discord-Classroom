const Discord = require('discord.js')

module.exports = {
    minArgs: 0,
    maxArgs: 0,
    syntaxError: 'Incorrect syntax! Use `{PREFIX}`ping {ARGUMENTS}',
    callback: async ({message, client}) => {
        let guild = client.guilds.cache.get("841406860556763187");

        const embed = new Discord.MessageEmbed()
        .setColor('#2866c9')
        .setAuthor("Bot Teste", "https://imgur.com/aIut5rp.png")
        .setTitle(`Servidor: ${guild.name}`)
        .setDescription('Comandos nesse servidor começam com ``!``')
        .addFields(
            {name: '``!ping``', value: 'Testa conectividade com o bot e sua latência no momento'},
            {name: '``!say``', value: 'Faz o bot escrever a mensagem a ser enviada'},
            {name: '``!avatar``', value: 'Printa o avatar da pessoa mencionada ou o seu próprio avatar'},
            {name: '``!help``', value: 'Mostra os comandos disponíveis do bot'},
            {name: '``Boas-vindas``', value: 'Comando automático que mostra uma mensagem de boas-vindas quando alguém entra no servidor'},
            {name: '``Kickado``', value: 'Comando automático que mostra uma mensagem quando alguém é expulso do servidor'}
        ) 
        await message.channel.send(embed);
    }
}