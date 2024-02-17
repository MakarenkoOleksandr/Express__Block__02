const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 4040;

app.use(bodyParser.json());

const DB = [];

const findCategoryIndex = (category) =>
  DB.findIndex((cat) => cat.category === category);

const findProductIndex = (category, productName) => {
  const categoryIndex = findCategoryIndex(category);

  if (categoryIndex !== -1) {
    return DB[categoryIndex].products.findIndex((p) => p.name === productName);
  }

  return -1;
};

app.post("/category/add", (req, res) => {
  const { category } = req.body;

  if (findCategoryIndex(category) !== -1) {
    res.json({ ok: true, data: `Category ${category} already exists` });
  }

  DB.push({ category, products: [] });
  res.json({ ok: true, data: `Category ${category} added successfully` });
});

app.post("/category/delete", (req, res) => {
  const { category } = req.body;
  const categoryIndex = findCategoryIndex(category);

  if (categoryIndex === -1) {
    return res.json({ ok: false, data: `Category ${category} doesn't exist` });
  }

  DB.splice(categoryIndex, 1);
  res.json({ ok: true, data: `Category ${category} deleted successfully` });
});

app.post("/category/update", (req, res) => {
  const { old_category, new_category } = req.body;
  const oldCategoryIndex = findCategoryIndex(old_category);

  DB[oldCategoryIndex].category = new_category;
  res.json({ ok: true, data: `Category ${new_category} updated successfully` });
});

app.use("/category/categories", (req, res) => {
  const categories = DB.map((c) => c.category).join(", ");
  res.json({ ok: true, data: categories });
});

app.use("/category/products", (req, res) => {
  res.json({ ok: true, data: DB });
});

app.use("/category/:category", (req, res) => {
  const { category } = req.params;
  const categoryIndex = findCategoryIndex(category);

  if (categoryIndex === -1) {
    return res.json({ ok: false, data: `Category ${category} doesn't exist` });
  }

  res.json({ ok: true, data: DB[categoryIndex].products });
});

app.post("/product/add", (req, res) => {
  const { category, product } = req.body;
  const categoryIndex = findCategoryIndex(category);

  if (categoryIndex === -1) {
    return res.json({ ok: false, data: `Category ${category} doesn't exist` });
  }

  DB[categoryIndex].products.push(product);
  res.json({ ok: true, data: `Product ${product.name} added successfully` });
});

app.post("/product/delete", (req, res) => {
  const { category, product } = req.body;
  const productIndex = findProductIndex(category, product.name);

  DB[findCategoryIndex(category)].products.splice(productIndex, 1);
  res.json({ ok: true, data: `Product ${product.name} deleted successfully` });
});

app.post("/product/update", (req, res) => {
  const { category, old_product, new_product } = req.body;
  const productIndex = findProductIndex(category, old_product.name);

  DB[findCategoryIndex(category)].products[productIndex] = {
    ...DB[findCategoryIndex(category)].products[productIndex],
    ...new_product,
  };
  res.json({
    ok: true,
    data: `Product ${new_product.name} updated successfully`,
  });
});

app.listen(port, () => {});
