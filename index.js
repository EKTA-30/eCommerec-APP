const {serverPort} = require('./config/congif.server')
const express = require('express')
const app = express()
const {Categories, sequelize} = ('./models');

app.listen(serverPort, async() => {
    console.log('Server started on port',serverPort);
    // await Category.sync({force:true})
    await sequelize.sync({force:true})
})

// console.log('serverPort', serverPort)

//npx sequelize model:generate --name Categories --attributes name:text,description:text
