const { serverPort } = require("./config/congif.server");
const express = require("express");
const { Categories, sequelize ,Products,Role} = require("./models");
const {authRoutes, categoryRoutes,	productRoutes, cartRoutes} = require('./routes')
const app = express()

// app.use(bodyParser)
app.use(express.json())
app.use(authRoutes)
app.use(categoryRoutes)
app.use(productRoutes)
app.use(cartRoutes)

app.listen(serverPort, async () => {
  console.log("server is running on this port", serverPort);
  await init();
});
async function init() {
  try {
    await sequelize.sync({force:true});
    // await Categories.sync({ force: true });
    // name: DataTypes.TEXT,
    // description: DataTypes.TEXT,
    // cost: DataTypes.INTEGER,
    // quantity:DataTypes.INTEGER

    
    const defaultCategories= [
      {
        name: "Beauty",
        description: "All premium brands",
      },
      {
        name: "Clothes",
        description: "Best of fashion",
      },
      {
        name: "Footwear",
        description: "All footwears here !",
      }
    ];
    const defaultProducts = [
      {
        name: "Lip gloss",
        description: "for sensitive lips",
        cost:500,
        quantity:2,
        CategoryId:1
      },
      {
        name: "Hoodie",
        description: "for monsoon ",
        cost:1500,
        quantity:2,
        CategoryId:2
      },
      {
        name: "Sneakers",
        description: "for lifting your spirits ",
        cost:2000,
        quantity:2,
        CategoryId:3
      }
    ];
    const defaultRoles = [
      {
        rolename : 'User'
      },
      {
        rolename: 'Admin',
      }
      ]
      
    const result1 = await Role.bulkCreate(defaultRoles);
    const result = await Categories.bulkCreate(defaultCategories);
    const result2 = await Products.bulkCreate(defaultProducts);
    console.log(result1);
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

// npx sequelize model:generate --name User --attributes username:text email:text password:text
//npx sequelize model:generate --name Post --attributes userId:integer,content:text
// npx sequelize model:generate --name Products --attributes name:text,description:text,cost:integer
