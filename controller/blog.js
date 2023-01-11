const errorFunction = require("../utils/errorFunction");
const db = require("../config/db");
require("dotenv").config();

const createBlog = (req, res) => {
  const blogData = ({ blog_title, blog_body, blog_author } = req.body);
  const insertQuery = "INSERT INTO blogs SET ?";
  db.query(insertQuery, blogData, (err, result) => {
    if (err) {
      console.log(err);
      return res
        .status(400)
        .json(errorFunction(true, "Error while creating blog"));
    } else {
      return res.status(201).json(errorFunction(false, "Blog Created", result));
    }
  });
};

const getBlogList = (req, res) => {
  const listQuery = "SELECT * FROM blogs";
  db.query(listQuery, (err, result) => {
    if (err) {
      console.log(err);
      return res
        .status(400)
        .json(errorFunction(true, "Error while fetching blogs"));
    } else {
      return res.status(200).json(errorFunction(false, "List Of Blog", result));
    }
  });
};

const getBlogByID = (req, res) => {
  const detailsQuery = "SELECT * FROM blogs WHERE blog_id = ?";
  db.query(detailsQuery, [req.params.id], (err, result) => {
    if (err) {
      console.log(err);
      return res
        .status(400)
        .json(errorFunction(true, "Error while fetching blog details"));
    } else {
      return res.status(200).json(errorFunction(false, "Blog Details", result));
    }
  });
};

const updateBlog = (req, res) => {
  const blogData = ({ blog_title, blog_body, blog_author } = req.body);
  const updateQuery = "UPDATE blogs SET ? WHERE ?";
  db.query(
    updateQuery,
    [blogData, { blog_id: req.params.id }],
    (err, result) => {
      if (err) {
        console.log(err);
        return res
          .status(400)
          .json(errorFunction(true, "Error while updating blogs"));
      } else {
        return res
          .status(200)
          .json(errorFunction(false, "Blog Updated Successfully", result));
      }
    }
  );
};

const deleteBlog = (req, res) => {
    const deleteQuery = "DELETE FROM blogs WHERE blog_id = ?";
  db.query(deleteQuery, [req.params.id], (err, result) => {
    if (err) {
      console.log(err);
      return res
        .status(400)
        .json(errorFunction(true, "Error while deleting blog"));
    } else {
      return res.status(200).json(errorFunction(false, "Blog Deleted", result));
    }
  });
};

module.exports = {
  createBlog,
  getBlogList,
  getBlogByID,
  updateBlog,
  deleteBlog,
};
