const mongoose = require('mongoose')
const mongoPath = 'mongodb+srv://treinamento:D8J5fobWSiIEWpUc@mongodb-discord.7wlqo.mongodb.net/test-db?retryWrites=true&w=majority'

module.exports = async () => {
    await mongoose.connect(mongoPath, {
        useNewUrlParser: true,
        useUnifiedTopology: true, 
    })
    return mongoose
}