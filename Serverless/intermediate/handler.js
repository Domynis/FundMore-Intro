const serverless = require("serverless-http");
const express = require("express");
const app = express();

app.use(express.json());
const Product = require("./Model/Product");

const products = [
  new Product(0, "Laptop", 1000),
  new Product(1, "Mouse", 20),
  new Product(2, "Keyboard", 50),
]

app.get("/products", (req, res, next) => {
  return res.status(200).json({
    products: products,
  });
})

app.get("/products/:id", (req, res, next) => {
  const productId = req.params.id;
  console.log(productId);
  const product = products.find(product => product.id == productId);
  if (product) {
    return res.status(200).json({
      product: product,
    });
  } else {
    return res.status(404).json({
      error: "Product not found",
    });
  }
});

app.post("/products", (req, res, next) => {
  const { name, price } = req.body;
  const product = new Product(products.length, name, price);
  products.push(product);
  console.log(products);
  return res.status(201).json({
    message: "Product created successfully",
  });
});

app.put("/products/:id", (req, res, next) => {
  const productId = req.params.id;
  const { name, price } = req.body;
  const product = products.find(product => product.id == productId);
  if (product) {
    product.name = name;
    product.price = price;
    console.log(products);
    return res.status(200).json({
      message: "Product updated successfully",
    });
  } else {
    return res.status(404).json({
      error: "Product not found",
    });
  }
});

app.delete("/products/:id", (req, res, next) => {
  const productId = req.params.id;
  const productIndex = products.findIndex(product => product.id == productId);
  if (productIndex !== -1) {
    products.splice(productIndex, 1);
    console.log(products);
    return res.status(200).json({
      message: "Product deleted successfully",
    });
  } else {
    return res.status(404).json({
      error: "Product not found",
    });
  }
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

exports.handler = serverless(app);