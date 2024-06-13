//this backend folder is useless now, as I am using firebase directly for cart and orders.












import fs from "node:fs/promises";
import bodyParser from "body-parser";
import express from "express";
//firebase imports

const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// app.get("/order", async (req, res) => {
//   const meals = await fs.readFile("./data/orders.json", "utf8");
//   res.json(JSON.parse(meals));
// });
app.get("/order", async (req, res) => {
  try {
    const orders = await fs.readFile("./data/orders.json", "utf8");
    return res.json(JSON.parse(orders));
  } catch (error) {
    res.status(500).json({ message: "Error reading orders data." });
  }
});

app.post("/orders", async (req, res) => {
  const orderData = req.body.order;

  if (
    orderData === null ||
    orderData.items === null ||
    orderData.items === []
  ) {
    return res.status(400).json({ message: "Missing data." });
  }

  if (
    orderData.customer.email === null ||
    !orderData.customer.email.includes("@") ||
    orderData.customer.name === null ||
    orderData.customer.name.trim() === "" ||
    orderData.customer.street === null ||
    orderData.customer.street.trim() === "" ||
    orderData.customer["postal-code"] === null ||
    orderData.customer["postal-code"].trim() === "" ||
    orderData.customer.city === null ||
    orderData.customer.city.trim() === ""
  ) {
    return res.status(400).json({
      message:
        "Missing data: Email, name, street, postal code or city is missing.",
    });
  }
  if (orderData.userEmail === null || orderData.userEmail.trim() === "") {
    return res.status(400).json({
      message: "Missing data: User login email.",
    });
  }
  const now = new Date();
  const localeDate = now.toLocaleString();
  // console.log(localeDate); // Example: 10/15/2023, 1:45:30 PM

  console.log(orderData);
  const newOrder = {
    items: orderData.items,
    date: localeDate,
    id: orderData.userEmail.toString(),
  };
  console.log(newOrder);
  const orders = await fs.readFile("./data/orders.json", "utf8");
  const allOrders = JSON.parse(orders);
  allOrders.push(newOrder);
  await fs.writeFile("./data/orders.json", JSON.stringify(allOrders));
  res.status(201).json({ message: "Order created!" });
});

app.use((req, res) => {
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  res.status(404).json({ message: "Not found" });
});

app.listen(3000);
