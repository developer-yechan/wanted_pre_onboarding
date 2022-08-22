const models = require("../database/models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const getSearchPosts = async (req, res, next) => {
  try {
    const keyword = req.query.keyword;
    const searchedPosts = await models.jobPostings.findAll({
      include: [
        {
          model: models.companies,
          attributes: ["name", "country", "region"],
        },
        {
          model: models.skills,
          attributes: ["name"],
          through: { attributes: [] },
        },
      ],
      attributes: [["id", "jobPost_id"], "position", "compensation"],
      where: {
        [Op.or]: [
          { position: { [Op.like]: `%${keyword}%` } },
          { compensation: { [Op.like]: `%${keyword}%` } },
          { "$company.name$": { [Op.like]: `%${keyword}%` } },
          { "$company.country$": { [Op.like]: `%${keyword}%` } },
          { "$company.region$": { [Op.like]: `%${keyword}%` } },
          { "$skills.name$": { [Op.like]: `%${keyword}%` } },
        ],
      },
    });
    return res.status(200).json(searchedPosts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getSearchPosts };
