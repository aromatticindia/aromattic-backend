const Products = require("../models/product");
const Blogs = require("../models/blog");

const constants = require("../helpers/constants");

exports.getLandingPageData = (req, res) => {
  let blogs_data = [];
  let product_data = [];
  Blogs.find({})
    .sort({ createdAt: -1 })
    .select("-imageLink2 -p2 -p3")
    .exec((err, blogs) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      } else {
        blogs_data = blogs;
        Products.find({})
          .select("-imageLinks")
          .exec((err, products) => {
            if (err) {
              return res.status(400).json({
                error: err,
              });
            } else {
              product_data = products;
              return res.status(201).json({
                navBanner: constants.NAV_BANNER,
                landing: constants.LANDING,
                perfumes: {
                  title: constants.LANDING_PAGE_PERFUME_SECTION_TITLE,
                  buttonText: constants.PERFUME_SECTION_BUTTON_TEXT,
                  data: products,
                },
                blogs: {
                  title: constants.LANDING_PAGE_BLOG_SECTION_TITLE,
                  buttonText: constants.BLOG_SECTION_BUTTON_TEXT,
                  data: blogs,
                },
              });
            }
          });
      }
    });
};
