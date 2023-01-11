const joi = require("joi");
const errorFunction = require("../utils/errorFunction");

const createValidation = joi.object({
    title: joi.string().min(3).max(20).trim(true).required(),
    body: joi.string().min(10).max(500).trim(true).required(),
    author: joi.string().trim(true).required(),
});

const updateValidation = joi.object({
  id: joi.number().required(),
  title: joi.string().min(3).max(20).trim(true).required(),
  body: joi.string().min(10).max(500).trim(true).required(),
  author: joi.string().trim(true).required(),
});

const createBlogValidation = async (req, res, next) => {
  const payload = {
    title: req.body.blog_title,
    body: req.body.blog_body,
    author: req.body.blog_author,
  };

  const { error } = createValidation.validate(payload);
  if (error) {
    res.status(406);
    return res.json(
      errorFunction(true, `Error in Blog Data : ${error.message}`)
    );
  } else {
    next();
  }
};

const updateBlogValidation = async (req, res, next) => {
  const payload = {
    id: req.params.id,
    title: req.body.blog_title,
    body: req.body.blog_body,
    author: req.body.blog_author,
  };

  const { error } = updateValidation.validate(payload);
  if (error) {
    res.status(406);
    return res.json(
      errorFunction(true, `Error in Blog Data : ${error.message}`)
    );
  } else {
    next();
  }
};

module.exports = { createBlogValidation, updateBlogValidation };
