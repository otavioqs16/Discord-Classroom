module.exports = {
    minArgs: 0,
    maxArgs: -1,
    permissions: ['ADMINISTRATOR'],
    callback: ({message, args}) => {
        const sayMessage = args.join(" ");
        message.delete().catch(O_o => {});
        message.channel.send(sayMessage);
    }
}