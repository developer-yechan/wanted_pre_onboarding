const searchRepos = require("../repos/search");

const getSearchPosts = async (req, res, next) => {
  try {
    const keyword = req.query.keyword;
    const searchedPosts = await searchRepos.getSearchPosts(keyword);
    return res.status(200).json(searchedPosts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getSearchPosts };
