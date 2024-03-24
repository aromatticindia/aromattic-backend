const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    p1: {
      type: String,
      require: true,
    },
    p2: {
      type: String,
    },
    p3: {
      type: String,
    },
    date: {
      type: String,
      required: true,
    },
    imageLink1: {
      type: String,
      required: true,
    },
    imageLink2: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blogs", blogSchema);
