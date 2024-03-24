const express = require("express");
const router = express.Router();

const {
  addBlog,
  viewBlog,
  listAllBlogs,
  updateBlog,
  removeBlog,
} = require("../controllers/blog");

router.post("/blog", addBlog);
router.get("/blogs", listAllBlogs);
router.get("/blog/:slug", viewBlog);
router.delete("/blog/:slug", removeBlog);
router.put("/blog/:slug", updateBlog);

module.exports = router;
