const { serverPort } = require("./config/congif.server");
const express = require("express");
const { Categories, sequelize ,Products} = require("./models");
const {categoryRoutes, productRoutes} = require('./routes')
const app = express()

app.use(express.json())
app.use(categoryRoutes)
app.use(productRoutes)

app.listen(serverPort, async () => {
  console.log("server is running on this port", serverPort);
  await init();
});
async function init() {
  try {
    await Products.sync({ force: true });
    await Categories.sync({ force: true });

    const defaultCategories = [
      {
        name: "Mobile",
        description: "About Mobile",
      },
      {
        name: "Washing Machine",
        description: "About Washing Machine",
      },
    ];

    const result = await Categories.bulkCreate(defaultCategories);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
}

// console.log('serverPort', serverPort);

//npx sequelize model:generate --name Categories --attributes name:text,description:text
// npm init

// npm install --save sequelize
//npm install --save mysql2
//npm install --save sequelize-cli
//npm install --save express

// Help command npx sequelize

// npx sequelize init -> config, models, migrations, seeders

// npx sequelize db:create ---> database created

// npx sequelize model:generate --name User --attributes name:text,role:text,email:text
//npx sequelize model:generate --name Post --attributes userId:integer,content:text
// npx sequelize model:generate --name Products --attributes name:text,description:text,cost:integer
