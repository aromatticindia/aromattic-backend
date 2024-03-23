const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema(
  {
    buyerId: {
      type: ObjectId,
      ref: "Users",
    },
    items: [{ type: ObjectId, ref: "Products" }],
    orderDateTime: {
      type: String,
    },
    transactionId: {
      type: String,
    },
    orderStatus: {
      enum: ["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Orders", orderSchema);
