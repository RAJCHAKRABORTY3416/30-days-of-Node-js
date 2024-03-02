const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Users', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    quantity: Number
});

const Product = mongoose.model('Product', productSchema);

async function createProductNameIndex() {
    try {
        await Product.collection.createIndex({ name: 1 });
        console.log('Index on "name" field created successfully.');
    }
    catch (error) {
        console.error('Error creating index:', error);
    }
}
createProductNameIndex();

const sampleProducts = [
    { name: 'Apple', price: 40, quantity: 5 },
    { name: 'Mango', price: 50, quantity: 10 },
    { name: 'Orange', price: 30, quantity: 15 },
];

async function insertSampleData() {
    try {
        await Product.insertMany(sampleProducts);
        console.log('Sample products inserted successfully.');
    }
    catch (error) {
        console.error('Error inserting sample data:', error);
    }
}

insertSampleData();

async function getProductStatistics() {
    return await Product.aggregate([
        {
            $group: {
                _id: null,
                totalProducts: { $sum: 1 },
                averagePrice: { $avg: '$price' },
                highestQuantity: { $max: '$quantity' }
            }
        }
    ]);
}

getProductStatistics().then(result => console.log(result));