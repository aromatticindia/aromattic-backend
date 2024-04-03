const Products = require('../models/product');
const slugify = require('slugify');
const _ = require('lodash');

//by admin
exports.addProduct = (req, res) => {
  const {
    name,
    description,
    type,
    category,
    originalPrice,
    discountedPrice,
    quantity,
    imageLinks,
    displayImageLink,
    rating,
    reviews,
  } = req.body;
  let product = new Products();
  product.name = name;
  product.description = description;
  product.type = type;
  product.category = category;
  product.originalPrice = originalPrice;
  product.discountedPrice = discountedPrice;
  product.quantity = quantity;
  product.imageLinks = imageLinks;
  product.displayImageLink = displayImageLink;
  product.slug = slugify(name).toLowerCase();
  product.discountPercentage = Math.ceil(((originalPrice - discountedPrice) * 100) / originalPrice);
  product.rating = rating;
  product.reviews = reviews;

  product.save((err, result) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    } else {
      return res.status(201).json({ message: 'Product added successfully' });
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
        message: "We're sorry. The Web address you entered is not a functioning page on our site.",
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
  Products.find({})
    .select('-imageLinks')
    .exec((err, result) => {
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
  const { search } = req.query;
  if (search) {
    Products.find(
      {
        $or: [{ name: { $regex: search, $options: 'i' } }],
      },
      (err, result) => {
        if (err) {
          return res.status(400).json({
            error: err,
          });
        } else {
          return res.status(200).json({ data: result });
        }
      },
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

//get all products by category
exports.productsByCategory = (req, res) => {
  Products.find({ category: req.body.category }).exec((err, result) => {
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
exports.removeProduct = (req, res) => {
  console.log('@Sama', req);
  Products.findOneAndRemove({ _id: req.params.id }).exec((err, data) => {
    if (err) {
      return res.json({
        error: err,
      });
    }
    res.json({
      message: 'Product deleted successfully',
    });
  });
};

//update
exports.updateProduct = (req, res) => {
  const slug = req.params.slug.toLowerCase();

  Products.findOne({ slug }).exec((err, oldProduct) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }

    const fields = req.body;
    let slugBeforeMerge = oldProduct.slug;
    oldProduct = _.merge(oldProduct, fields);
    oldProduct.slug = slugBeforeMerge;

    oldProduct.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json(result);
    });
  });
};
