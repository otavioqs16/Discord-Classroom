const economy = require('../economy')

module.exports = {
    commands: 'addbalance',
    minArgs: 2,
    maxArgs: 2,
    expectedArgs: "<The target's @> <Coin amount>",
    permissionError: 'You must be an admin to run this command!',
    permissions: ['ADMINISTRATOR'],
    callback: async ({message, args}) => {
        const mention = message.mentions.users.first();
        const [user, userCoins] = args
        console.log(args)
        if(!mention){
            message.reply('Please tag a user to add coins to.')
            return
        }

        const coins = userCoins
        if(isNaN(coins)){
            message.reply('Please provide a valid number of coins.')
            return
        }

        const guildId = message.guild.id
        const userId = mention.id

        const newCoins = await economy.addCoins(guildId, userId, coins)

        message.reply(`You have given <@${userId}> ${coins} coins. They now have ${newCoins} coins.`)
    }
}