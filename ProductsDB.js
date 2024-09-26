// add json data in database. (Products.json)
require("dotenv").config();

const connectDB = require("./config/db");

const ProductModel = require("./models/ProductModel"); 

const ProductData = require('./Products.json');

const uri = `${process.env.MONGO_URI}`

const start = async () => {
    try {
        await connectDB(uri);
        await ProductModel.deleteMany({}); // Clear existing data before inserting new
        await ProductModel.create(ProductData);
        console.log(`Data saved in DB successfully.`);
    } catch (error) {
        console.log(error);
    }
}

start();