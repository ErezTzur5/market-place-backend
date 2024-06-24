// seed.js
// This script seeds the database with sample data.
// This is for development purposes only and should not be used in production.

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const Product = require("./models/products.model");

dotenv.config(); // Load environment variables

// Sample data
const products = [
  {
    id: "P12346",
    name: "Wireless Headphones",
    price: 99.99,
    quantity: 150,
    category: "Electronics",
  },
  {
    id: "P12348",
    name: "Smartphone",
    price: 599.99,
    quantity: 75,
    category: "Electronics",
  },
  {
    id: "P12349",
    name: "Laptop",
    price: 1299.99,
    quantity: 50,
    category: "Computers",
  },
  {
    id: "P12350",
    name: "Smartwatch",
    price: 199.99,
    quantity: 200,
    category: "Wearables",
  },
  {
    id: "P12351",
    name: "Bluetooth Speaker",
    price: 49.99,
    quantity: 300,
    category: "Audio",
  },
];

// Insert sample data into the database
async function seedDB() {
  await connectDB(); // Connect to the database
  try {
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("Database seeded");
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.connection.close(); // Close the database connection
  }
}

seedDB();
