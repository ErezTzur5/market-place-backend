// const express = require("express");
// const cors = require("cors");
// const app = express();
// const PORT = process.env.PORT || 3000;

// const productRoutes = require("./routes/product.route");
// const connectDB = require("./config/db");

// app.use(express.json());
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//   })
// );

// app.use("/api/products", productRoutes);

// app.get("/", (req, res) => {
//   res.send("Welcome to the Products API!");
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");

const PORT = process.env.PORT || 3000;
const connectDB = require("./config/db");

dotenv.config(); // Load config

async function main() {
  // Connect to database
  await connectDB();

  // MIDDLEWARES
  // parse json body in request (for POST, PUT, PATCH requests)
  app.use(express.json());

  // allow CORS for local development (for production, you should configure it properly)
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );

  // Routes
  const productRoutes = require("./routes/product.route");
  app.use("/api/products", productRoutes);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

main();
