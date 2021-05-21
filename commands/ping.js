module.exports = {
   name: 'ping',
   minArgs: 0,
   maxArgs: 0,
   syntaxError: 'Incorrect syntax! Use `{PREFIX}`ping {ARGUMENTS}',
   callback: ({message, client}) => {
      message.reply(`🏓 Pong! A latência do servidor é ${Date.now() - message.createdTimestamp}ms. A latência da API é ${Math.round(client.ws.ping)}ms.`);
   }
}