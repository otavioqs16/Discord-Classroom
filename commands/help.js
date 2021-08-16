const Discord = require('discord.js')

module.exports = {
    minArgs: 0,
    maxArgs: 0,
    syntaxError: 'Incorrect syntax! Use `{PREFIX}`help',
    callback: async ({message, client}) => {
        let guild = client.guilds.cache.get("841406860556763187");

        const embed = new Discord.MessageEmbed()
        .setColor('#2866c9')
        .setAuthor("ClassRoom", "https://img.icons8.com/color/480/classroom.png")
        .setTitle(`Servidor: ${guild.name}`)
        .setDescription('Comandos nesse servidor começam com ``!`` ou ``/``')
        .addFields(
            {name: '``/addAtividade``', value: 'Adicionar nova atividade'},
            {name: '``/addNota``', value: 'Adicionar nota de uma atividade a um determinado aluno'},
            {name: '``/delAtividade``', value: 'Deletar uma atividade'},
            {name: '``/listarTiposAtividade``', value: 'Listar todos os tipos de atividade existentes'},  
            {name: '``/infoAtividade``', value: 'Informações de uma atividade específica'},
            {name: '``!listarAtividades <tipo atividade>``', value: 'Lista todas as atividades de determinado tipo'},
            {name: '``/listarTipo``', value: 'Listar todas as atividades relacionadas a um tipo de atividade'},
            {name: '``!listarNotas <nome aluno>``', value: 'Lista as notas de determinado aluno'},
            {name: '``!listarNotaAtividade <tipo atividade> <desc>``', value: 'Listar as notas dos alunos em determinada atividade'},
            {name: '``/notaTotal``', value: 'Informa a nota total de determinado aluno'}
            ) 
        await message.channel.send(embed);
    }
}