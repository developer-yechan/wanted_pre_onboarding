const express = require("express");
const { getSearchPosts } = require("../services/search");
const router = express.Router();

router.get("/search/jobpost", getSearchPosts);

module.exports = router;
