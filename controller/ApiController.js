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

const addCustomer = (req, res) => {
  const { customerName, email, mobileNumber, city } = req.body;
  if (!customerName || !email || !mobileNumber || !city) {
    return res.status(400).json({ error: "All fields are required." });
  }
  const customer = {
    customerId: generateCustomerId(),
    customerName,
    email,
    mobileNumber,
    city,
  };
  customers.push(customer);
  res.status(201).json(customer);
};

const addPurchaseOrder = (req, res) => {
  const { productName, quantity, pricing, mrp, customerId } = req.body;
  if (!productName || !quantity || !pricing || !mrp || !customerId) {
    return res.status(400).json({ error: "All fields are required." });
  }
  if (pricing > mrp) {
    return res
      .status(400)
      .json({ error: "Pricing cannot be greater than MRP." });
  }
  const purchaseOrder = {
    purchaseOrderId: generatePurchaseOrderId(),
    productName,
    quantity,
    pricing,
    mrp,
    customerId,
  };
  purchaseOrders.push(purchaseOrder);
  res.status(201).json(purchaseOrder);
};

const addShippingDetail = (req, res) => {
  const { address, city, pincode, purchaseOrderId, customerId } = req.body;
  if (!address || !city || !pincode || !purchaseOrderId || !customerId) {
    return res.status(400).json({ error: "All fields are required." });
  }
  const shippingDetail = {
    shippingDetailId: generateShippingDetailId(),
    address,
    city,
    pincode,
    purchaseOrderId,
    customerId,
  };
  shippingDetails.push(shippingDetail);
  res.status(201).json(shippingDetail);
};

//Get req Controllers

const getCustomersByCity = (req, res) => {
  const city = req.params.city;
  const filteredCustomers = customers.filter(
    (customer) => customer.city === city
  );
  res.json(filteredCustomers);
};

const getCustomersWithPurchaseOrders = (req, res) => {
  const customersWithPurchaseOrders = customers.map((customer) => ({
    ...customer,
    purchaseOrders: purchaseOrders.filter(
      (po) => po.customerId === customer.customerId
    ),
  }));
  res.json(customersWithPurchaseOrders);
};

const getCustomersWithDetails = (req, res) => {
  const customersWithDetails = customers.map((customer) => ({
    ...customer,
    purchaseOrders: purchaseOrders.filter(
      (po) => po.customerId === customer.customerId
    ),
    shipmentDetails: shippingDetails.filter(
      (sd) => sd.customerId === customer.customerId
    ),
  }));
  res.json(customersWithDetails);
};

module.exports = {
  addCustomer,
  addPurchaseOrder,
  addShippingDetail,
  getCustomersByCity,
  getCustomersWithPurchaseOrders,
  getCustomersWithDetails,
};
