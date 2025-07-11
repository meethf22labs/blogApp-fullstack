const express = require("express");
const router = express.Router();
const {postBlog, getBlogByTag, editBlogById, getBlogById, deleteBlogById} = require("../controllers/posts.controller");


router.post("/posts", postBlog); // auth required 
router.get("/posts", getBlogByTag); // "/posts?page=1&tag=xyz"
router.put("/posts/:id", editBlogById);
router.get("/posts/:id", getBlogById);
router.delete("/posts/:id", deleteBlogById);


module.exports = router;