const { Products } = require("../models");

async function createProduct(req, res) {
  const data = req.body;

  if (!data.name && data.cost && data.quantity) {
    res.status(400).send({ msg: "Name, cost and quantity missing" });
  }

  const name = data.name;
  const description = data.description;
  const cost = data.cost;
  const quantity = data.quantity;

  try {
    const result = await Products.create({ name, description, cost, quantity });
    console.log("result", result);
    res.send({ msg: "Product has been created" });
  } catch (err) {
    console.log("err in creation of product", err);
    res.status(500).send({ msg: "Internal server error" });
  }
}
async function getAllProducts(req, res) {
  try {
    const result = await Products.findAll();
    res.send(result);
  } catch (err) {
    console.log("err in getting products", err);
    res.status(500).send({ msg: "Internal server error" });
  }
}

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

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
