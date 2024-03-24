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
      enum: ["MALE_CATEGORY", "FEMALE_CATEGORY", "UNISEX_CATEGORY"],
      required: true,
    },
    type: {
      type: String,
      enum: ["eau_de_parfum", "eau_de_toilette", "eau_de_fraiche"],
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Products", productSchema);
