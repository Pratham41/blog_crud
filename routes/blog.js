const router = require("express").Router();
const {
  createBlog,
  getBlogByID,
  getBlogList,
  updateBlog,
  deleteBlog,
} = require("../controller/blog");
const { createBlogValidation, updateBlogValidation } = require("../middleware/blog.validator")
const { db } = require("../config/db");
require("dotenv").config();


router.route("/").get(getBlogList);
router.route("/:id").get(getBlogByID);
router.route("/add").post(createBlogValidation,createBlog);
router.route("/update/:id").put(updateBlogValidation,updateBlog);
router.route("/delete/:id").delete(deleteBlog);

module.exports = router;
