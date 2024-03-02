// Import necessary modules
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://iamraj:O3mmpeh2224PhBIr@cluster0.drjbf1k.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define the Product schema
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number
});

// Define the Product model
const Product = mongoose.model('Product', productSchema);

/**
 * Creates an index on the "name" field of the "Product" collection in MongoDB
 */
async function createProductNameIndex() {
  try {
    await Product.collection.createIndex({ name: 1 });
    console.log('Index on "name" field created successfully.');
  } catch (error) {
    console.error('Error creating index:', error);
  }
}

// Call the function to create the index
createProductNameIndex();

// Sample data for testing
const sampleProducts = [
  { name: 'Product 1', price: 10, quantity: 100 },
  { name: 'Product 2', price: 20, quantity: 200 },
  { name: 'Product 3', price: 30, quantity: 300 }
];

// Function to insert sample data
async function insertSampleData() {
  try {
    await Product.insertMany(sampleProducts);
    console.log('Sample products inserted successfully.');
  } catch (error) {
    console.error('Error inserting sample data:', error);
  }
}

// Call the function to insert sample data
insertSampleData();