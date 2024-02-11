const Products = require("../models/product");
const slugify = require("slugify");

//by admin
exports.addProduct = (req, res) => {
  const {
    name,
    description,
    type,
    originalPrice,
    discountPercentage,
    quantity,
    imageLink,
  } = req.body;
  let product = new Products();
  product.name = name;
  product.description = description;
  product.type = type;
  product.originalPrice = originalPrice;
  product.discountPercentage = discountPercentage;
  product.quantity = quantity;
  product.imageLink = imageLink;
  product.slug = slugify(name).toLowerCase();

  product.save((err, result) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    } else {
      return res.status(201).json({ message: "Product added successfully" });
    }
  });
};

//by user
exports.viewProduct = (req, res) => {
  Products.findOne({ slug: req.params.slug }).exec((err, result) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (result) {
      return res.status(200).json({ data: result });
    } else {
      return res.status(404).json({
        message:
          "We're sorry. The Web address you entered is not a functioning page on our site.",
      });
    }
  });
};

//by admin
exports.viewProductAdmin = (req, res) => {
  Products.findOne({ _id: req.params.id }).exec((err, result) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    } else {
      return res.status(200).json({ data: result });
    }
  });
};

//by user and admin
exports.allProducts = (req, res) => {
  Products.find({}).exec((err, result) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    } else {
      return res.status(200).json({ data: result });
    }
  });
};

//by admin and user both
exports.searchProduct = (req, res) => {
  const search = req.query.key;
  if (search) {
    Products.find(
      {
        $or: [{ name: { $regex: search, $options: "i" } }],
      },
      (err, result) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        } else {
          return res.status(200).json({ data: result });
        }
      }
    );
  }
};

//get all products by type
exports.productsByType = (req, res) => {
  Products.find({ type: req.body.type }).exec((err, result) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    } else {
      return res.status(200).json({ data: result });
    }
  });
};

//remove

//update
