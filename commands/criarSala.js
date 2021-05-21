module.exports = {
    minArgs: 0,
    maxArgs: 0,
    syntaxError: 'Incorrect syntax! Use `{PREFIX}`criarSala {ARGUMENTS}',
    callback: async ({message}) => {
        await message.guild.channels.create(`prova-${message.author.id}`, {
          type: 'text',
          parent: '841411526647611412',
          permissionOverwrites: [
          {
            id: '841406860556763187',
            deny: ['VIEW_CHANNEL'],
          },
          {
            id: message.author.id,
            allow: ['VIEW_CHANNEL'],
          },
          ]
      })
      message.delete().catch(O_o => {});
    }
    
};