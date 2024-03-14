const express = require("express");
const cors = require("cors");
const { dataBaseConnection } = require("./Configs/dataBase");
const { productRouter } = require("./Routes/product");
const { orderRouter } = require("./Routes/orders");
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", productRouter);
app.use("/api", orderRouter);

app.get("/", async (req, res) => {
  res.status(200).json({ message: "Welcome To Product Management Backend" });
});

app.listen(8080, async () => {
  try {
    console.log("server is Started at 8080");
    await dataBaseConnection;
    console.log("Server is Connected to DataBase ");
  } catch (error) {}
});
