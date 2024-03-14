const mongoose = require("mongoose");

const orderModelSchema = mongoose.Schema({
  customerName: { required: true, type: String },
  status: { required: true, type: String },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
      quantity: { type: Number, required: true },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const OrderModel = mongoose.model("order", orderModelSchema);

module.exports = { OrderModel };
