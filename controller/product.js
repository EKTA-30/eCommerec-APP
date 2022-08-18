const { Products } = require("../models");

//Creating product
async function createProduct(req, res) {
  const data = req.body;
  const name = data.name;
  const description = data.description;
  const cost = data.cost;
  const quantity = data.quantity;
  const categoryId = data.categoryId;
  try {
    const result = await Products.create({ name, description, cost, quantity,categoryId });
    console.log("result", result);
    res.send({ msg: "Product has been created" });
  } catch (err) {
    console.log("err in creation of product", err);
    res.status(500).send({ msg: "Internal server error" });
  }
}
//fetching all products
async function getAllProducts(req, res) {
  try {
    const result = await Products.findAll();
    res.send(result);
  } catch (err) {
    console.log("err in getting products", err);
    res.status(500).send({ msg: "Internal server error" });
  }
}
//fetching a product by id
async function getProductById(req, res) {
  const productId = req.params.id;

  try {
    const result = await Products.findOne({
      where: {
        id: productId,
      },
    });

    res.send(result);
  } catch (err) {
    console.log("err in getting products based on ID", err);
    res.status(500).send({ msg: "Internal server error" });
  }
}
//updating a product details
async function updateProduct(req, res) {
  const productId = req.params.id;
  try {
    const result = await Products.findOne({
      where: {
        id: productId,
      },
    });
    if (result) {
      result.name = req.body.name;
      result.description = req.body.description;
      result.cost = req.body.cost;
      result.quantity = req.body.quantity;

      result.save();
      res.send({ msg: "product got update", updateProduct: result });
    } else {
      console.log("err in getting products", err);
      res.status(400).send({ msg: "product id does not exist" });
    }
  } catch (err) {
    console.log("err in getting products", err);
    res.status(500).send({ msg: "Internal server error" });
  }
}
//updating a single attribute in a product
async function updateProductByAttribute(req, res){
const productId = req.params.id;
const attribute = req.query.queryValue;
console.log(attribute);
try{
  const result = await Products.findOne({
    where: {
      id: productId,
    },
  });
const attributes =['name','description','cost','quantity'];
if(result){
  if(attributes.includes(attribute)){
    result.attribute = req.body.attribute;

    result.save();
    res.send({ msg: "product got update", updateProduct: result });
  }
  else{
    res.status(404).send({msg:"Attribute not found"})
    
  }
} else {
    console.log("err in getting products", err);
    res.status(400).send({ msg: "product id does not exist" });
  }}
catch(err){
  console.log("err in updating product", err);
  res.status(500).send({ msg: "Internal server error" });
}
}

//deleting a product
async function deleteProduct(req, res) {
  const productId = req.params.id;
  try {
    const result = await Products.destroy({
      where: {
        id: productId,
      },
    });

    res.send({ msg: "product deleted", result });
  } catch (err) {
    console.log("err in deleting products", err);
    res.status(500).send({ msg: "Internal server error" });
  }
}
async function filterBasedOnProduct(req,res){
	const CategoryId = req.query.CategoryId; // ?CategoryId=3
	const name = req.query.name;// ?name=
	const minCost = req.query.minCost;// ?minCost=450
	const maxCost = req.query.maxCost;// ?maxCost=350

	if(CategoryId){
		const result = await Products.findAll({
				where: {
					CategoryId : CategoryId
				}
			})
		res.send(result);
	}
	if(name){
		const result = await Products.findAll({
				where: {
					name : name
				}
			})
		res.send(result);
	}
	if(minCost && maxCost){
		const result = await Products.findAll({
			where : {
				cost : {
					[Sequelize.Op.gte] : minCost,
					[Sequelize.Op.lte] : maxCost
				}
			}
		})

		res.send(result)
	}
	else if(minCost){
				const result = await Products.findAll({
			where : {
				cost : {
					[Sequelize.Op.gte] : minCost
				}
			}
		})
		res.send(result)
	} else if(maxCost){
		const result = await Products.findAll({
			where : {
				cost : {
					[Sequelize.Op.lte] : maxCost
				}
			}
		})

		res.send(result)
	}
	else{
		const result = await Products.findAll()
		res.send(result);
	}
}
module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  updateProductByAttribute,
  filterBasedOnProduct
};
