const mongoose = require('mongoose');

// Step 1: Define schemas for Category and Product
const categorySchema = new mongoose.Schema({
  name: String,
  description: String,
});

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
});

// Step 2: Create models for Category and Product
const Category = mongoose.model('Category', categorySchema);
const Product = mongoose.model('Product', productSchema);

// Step 3: Function to generate random products associated with the "fruits" category
async function generateRandomProducts(numProducts) {
  try {
    // Check if the "fruits" category exists, if not, create it
    let fruitsCategory = await Category.findOne({ name: 'fruits' });
    if (!fruitsCategory) {
      fruitsCategory = await Category.create({
        name: 'fruits',
        description: 'Category for fruits',
      });
    }

  
    const products = [];
    for (let i = 0; i < numProducts; i++) {
      const product = await Product.create({
        name: `Fruit ${i + 1}`,
        price: Math.random() * 10 + 1,
        quantity: Math.floor(Math.random() * 10) + 1,
        category: fruitsCategory._id,
      });
      products.push(product);
    }

    console.log('Random products generated:', products);
  } catch (error) {
    console.error('Error generating random products:', error);
  }
}


(async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb+srv://iamraj:EArfNXfPiI7Dv7aV@cluster0.zjjpap5.mongodb.net/?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Call the function to generate random products
    await generateRandomProducts(10); // Generate 10 products in the "fruits" category
  } catch (error) {
    console.error('Error:', error);
  }
})();