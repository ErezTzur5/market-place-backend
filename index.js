const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

const productRoutes = require("./routes/product.route");

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Products API!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
