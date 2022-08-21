const models = require("../database/models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const apply = async (req, res, next) => {
  try {
    const { UserId, jobPostingId } = req.body;
    const existingApply = await models.applies.findOne({
      where: {
        UserId,
        jobPostingId,
      },
    });
    if (existingApply) {
      return res
        .status(400)
        .json({ message: "이미 해당 공고에 지원하셨습니다." });
    }
    await models.applies.create({
      UserId,
      jobPostingId,
    });

    return res.status(200).json({ message: "Apply is created" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "server error" });
  }
};

module.exports = { apply };
