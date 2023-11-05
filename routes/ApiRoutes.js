const express = require("express");
const router = express.Router();
const apiController = require("../controller/ApiController");

router.post("/customers", apiController.addCustomer);
router.post("/purchase-orders", apiController.addPurchaseOrder);
router.post("/shipping-details", apiController.addShippingDetail);
router.get("/customers-by-city/:city", apiController.getCustomersByCity);
router.get(
  "/customers-with-purchase-orders",
  apiController.getCustomersWithPurchaseOrders
);
router.get("/customers-with-details", apiController.getCustomersWithDetails);

module.exports = router;
