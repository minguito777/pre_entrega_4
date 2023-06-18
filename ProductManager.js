const fs = require('fs');

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
    this.lastId = 0;
    this.loadProducts();
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.path, 'utf-8');
      this.products = JSON.parse(data);
      if (this.products.length > 0) {
        const lastProduct = this.products[this.products.length - 1];
        this.lastId = lastProduct.id;
      }
    } catch (error) {
      
      this.products = [];
      this.lastId = 0;
      this.saveProducts();
    }
  }

  saveProducts() {
    try {
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
    } catch (error) {
      console.error('Error al guardar los productos:', error);
    }
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    const newProduct = {
      id: ++this.lastId,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };
    this.products.push(newProduct);
    this.saveProducts();
    return newProduct;
  }

  getProductById(id) {
    const datos = fs.readFileSync(this.path);
    const products = JSON.parse(datos);
    return products.find(product => product.id === id);
  }

  updateProduct(id, updates) {
    const product = this.getProductById(id);
    if (product) {
      Object.assign(product, updates);
      this.saveProducts();
      return product;
    }
    return null;
  }

  deleteProduct(id) {
    const index = this.products.findIndex(product => product.id === id);
    if (index !== -1) {
      const deletedProduct = this.products.splice(index, 1)[0];
      this.saveProducts();
      return deletedProduct;
    }
    return null;
  }

  getAllProducts() {
    const datos = fs.readFileSync(this.path);
    return JSON.parse(datos);
  }
  
}
export default ProductManager;


const productManager = new ProductManager('products.json');
productManager.addProduct('xbox', 'console', 399, 'xbox.jpg', 'xx33', 6);
productManager.addProduct('ps5', 'console', 499, 'ps5.jpg', 'ps55', 6);
const allProducts = productManager.getAllProducts();
console.log(allProducts);
