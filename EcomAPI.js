const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const apiRoutes = require("./routes/ApiRoutes");

app.use(bodyParser.json());

const customers = [];
const purchaseOrders = [];
const shippingDetails = [];

function generateCustomerId() {
  return customers.length + 1;
}

function generatePurchaseOrderId() {
  return purchaseOrders.length + 1;
}

function generateShippingDetailId() {
  return shippingDetails.length + 1;
}

app.use("/api", apiRoutes);

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
