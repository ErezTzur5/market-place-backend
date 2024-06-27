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
  {
    id: "P12352",
    name: "Tablet",
    price: 449.99,
    quantity: 100,
    category: "Computers",
  },
  {
    id: "P12353",
    name: "Gaming Console",
    price: 399.99,
    quantity: 150,
    category: "Electronics",
  },
  {
    id: "P12354",
    name: "Fitness Tracker",
    price: 79.99,
    quantity: 250,
    category: "Wearables",
  },
  {
    id: "P12355",
    name: "External Hard Drive",
    price: 129.99,
    quantity: 120,
    category: "Computers",
  },
  {
    id: "P12356",
    name: "Wireless Mouse",
    price: 29.99,
    quantity: 180,
    category: "Computers",
  },
  {
    id: "P12357",
    name: "Digital Camera",
    price: 299.99,
    quantity: 80,
    category: "Electronics",
  },
  {
    id: "P12358",
    name: "Headphones with Mic",
    price: 79.99,
    quantity: 220,
    category: "Electronics",
  },
  {
    id: "P12359",
    name: "E-reader",
    price: 149.99,
    quantity: 90,
    category: "Electronics",
  },
  {
    id: "P12360",
    name: "Smart Home Speaker",
    price: 149.99,
    quantity: 180,
    category: "Audio",
  },
  {
    id: "P12361",
    name: "Wireless Keyboard",
    price: 49.99,
    quantity: 200,
    category: "Computers",
  },
  {
    id: "P12362",
    name: "Portable Charger",
    price: 39.99,
    quantity: 300,
    category: "Electronics",
  },
  {
    id: "P12363",
    name: "Wireless Earbuds",
    price: 129.99,
    quantity: 150,
    category: "Electronics",
  },
  {
    id: "P12364",
    name: "VR Headset",
    price: 299.99,
    quantity: 50,
    category: "Wearables",
  },
  {
    id: "P12365",
    name: "Monitor",
    price: 349.99,
    quantity: 100,
    category: "Computers",
  },
  {
    id: "P12366",
    name: "Soundbar",
    price: 199.99,
    quantity: 120,
    category: "Audio",
  },
  {
    id: "P12367",
    name: "Compact Printer",
    price: 89.99,
    quantity: 80,
    category: "Computers",
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
