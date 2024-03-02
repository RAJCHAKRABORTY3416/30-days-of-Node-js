const mongoose = require('mongoose');

// Define the Mongoose schema for the "Product" entity
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50
  },
  price: {
    type: Number,
    required: true,
    min: 0.01
  },
  quantity: {
    type: Number,
    required: true,
    min: 0
  }
});

// Create the Mongoose model
const Product = mongoose.model('Product', productSchema);

// Implement the CRUD operations:

async function createProduct(product) {
  try {
    const newProduct = new Product(product);
    await newProduct.save();
    return newProduct;
  } catch (error) {
    console.error(error);
    throw new Error('Error creating product');
  }
}

async function getAllProducts() {
  try {
    const products = await Product.find();
    return products;
  } catch (error) {
    console.error(error);
    throw new Error('Error retrieving products');
  }
}

async function updateProduct(productId, updatedProduct) {
  try {
    const product = await Product.findByIdAndUpdate(productId, updatedProduct, { new: true });
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  } catch (error) {
    console.error(error);
    throw new Error('Error updating product');
  }
}

async function deleteProduct(productId) {
  try {
    await Product.findByIdAndDelete(productId);
  } catch (error) {
    console.error(error);
    throw new Error('Error deleting product');
  }
}

// Example usage:
async function main() {
  // Replace with your actual MongoDB connection string
  await mongoose.connect('mongodb+srv://iamraj:2D4gISOqriuUyaQH@cluster0.o1x4kys.mongodb.net/?retryWrites=true&w=majority');

  // Create a new product
  const newProduct = await createProduct({ name: 'Example Product', price: 19.99, quantity: 10 });

  // Retrieve all products
  const allProducts = await getAllProducts();
  console.log(allProducts);

  // Update a product
  await updateProduct(newProduct._id, { price: 24.99 });

  // Delete the product
  await deleteProduct(newProduct._id);

  // Remember to close the connection
  await mongoose.disconnect();
}

main().catch(error => console.error(error));
