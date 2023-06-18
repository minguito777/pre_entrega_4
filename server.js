import express from 'express';
import ProductManager from'./ProductManager.js';

const app = express();
const productManager = new ProductManager('products.json');

app.get('/products', (req, res) => {
  const limit = parseInt(req.query.limit);
  const products = productManager.getProducts();

  if (limit > 0) {
    const limitedProducts = products.slice(0, limit);
    res.json(limitedProducts);
  } else {
    res.json(products);
  }
  
});

app.listen(8080, () => {
  console.log('puerto 8080 running');
});
