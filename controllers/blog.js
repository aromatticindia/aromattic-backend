const Blogs = require('../models/blog');
const slugify = require('slugify');
const constants = require('../helpers/constants');
const _ = require('lodash');

exports.addBlog = (req, res) => {
  const { title, p1, p2, p3, imageLink1, imageLink2 } = req.body;
  const currentDate = new Date();

  const options = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };

  const dateFormatter = new Intl.DateTimeFormat('en-US', options);
  const formattedDate = dateFormatter.format(currentDate);
  const blog = new Blogs({
    title,
    slug: slugify(title).toLowerCase(),
    p1,
    p2,
    p3,
    date: formattedDate,
    imageLink1,
    imageLink2,
  });
  blog.save((err, blog) => {
    if (err) {
      return res.status(401).json({
        error: err,
      });
    }
    return res.json({
      message: 'Blog created successfully.',
    });
  });
};

exports.viewBlog = (req, res) => {
  Blogs.findOne({ slug: req.params.slug }).exec((err, result) => {
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

exports.listAllBlogs = (req, res) => {
  Blogs.find({})
    .sort({ createdAt: -1 })
    .select('-imageLink2 -p2 -p3')
    .exec((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      } else {
        return res.status(200).json({
          title: constants.ALL_BLOGS_DISPLAY_PAGE_TITLE,
          data: result,
        });
      }
    });
};

//remove
exports.removeBlog = (req, res) => {
  const slug = req.params.slug.toLowerCase();
  Blogs.findOneAndRemove({ slug }).exec((err, data) => {
    if (err) {
      return res.json({
        error: err,
      });
    }
    res.json({
      message: 'Blog deleted successfully',
    });
  });
};

//update
exports.updateBlog = (req, res) => {
  const slug = req.params.slug.toLowerCase();

  Blogs.findOne({ slug }).exec((err, oldBlog) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }

    const fields = req.body;
    let slugBeforeMerge = oldBlog.slug;
    oldBlog = _.merge(oldBlog, fields);
    oldBlog.slug = slugBeforeMerge;

    oldBlog.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json(result);
    });
  });
};
