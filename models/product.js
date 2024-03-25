const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["MALE", "FEMALE", "UNISEX"],
      required: true,
    },
    type: {
      type: String,
      enum: ["EAU DE PARFUM", "EAU DE TOILETTE", "EAU DE FRAICHE"],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    displayImageLink: {
      type: String,
      required: true,
    },
    imageLinks: [
      {
        type: String,
      },
    ],
    originalPrice: {
      type: Number,
      required: true,
    },
    discountPercentage: {
      type: Number,
    },
    discountedPrice: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    reviews: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Products", productSchema);
