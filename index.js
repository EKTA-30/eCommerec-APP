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
