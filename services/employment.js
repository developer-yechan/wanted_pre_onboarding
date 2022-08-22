const models = require("../database/models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const postJob = async (req, res, next) => {
  try {
    const { companyId, position, compensation, content, skills } = req.body;
    const existingPost = await models.jobPostings.findOne({
      attributes: ["id"],
      where: {
        companyId,
        position,
      },
    });
    if (existingPost) {
      return res.status(400).json({ message: "동일한 채용공고가 존재합니다." });
    }
    await models.jobPostings.create({
      companyId,
      position,
      compensation,
      content,
    });
    const createdPost = await models.jobPostings.findOne({
      attributes: ["id"],
      where: {
        companyId,
        position,
      },
    });
    const postId = createdPost.id;
    for (let i = 0; i < skills.length; i++) {
      await models.requiredSkills.create({
        skillId: skills[i],
        jobPostingId: postId,
      });
    }
    return res.status(200).json({ message: "jobPosting is created" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "server error" });
  }
};

const updateJobPost = async (req, res, next) => {
  try {
    const { id, companyId, position, compensation, content } = req.body;
    const existingPost = await models.jobPostings.findOne({
      attributes: ["id"],
      where: {
        id,
      },
    });
    if (!existingPost) {
      return res.status(400).json({ message: "이미 삭제된 공고입니다." });
    }
    const updatedPost = await models.jobPostings.update(
      {
        companyId,
        position,
        compensation,
        content,
      },
      {
        where: { id },
      }
    );
    if (updatedPost[0] == 0) {
      return res.status(400).json({ message: "내용이 변경되지 않았습니다." });
    }
    console.log(updatedPost, "update");
    return res.status(200).json({ message: "jobPosting is updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "server error" });
  }
};

const deleteJobPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedPost = await models.jobPostings.destroy({
      where: { id },
    });
    if (!deletedPost) {
      return res.status(400).json({ message: "이미 삭제된 공고입니다." });
    }
    console.log(deletedPost, "delete");
    return res.status(200).json({ message: "jobPosting is deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "server error" });
  }
};

const getJobPostAll = async (req, res, next) => {
  try {
    const jobPosts = await models.jobPostings.findAll({
      include: [
        {
          model: models.companies,
          attributes: ["name", "country", "region"],
          required: true,
        },
        {
          model: models.skills,
          attributes: ["name"],
          through: { attributes: [] },
        },
      ],
      attributes: [["id", "jobPost_id"], "position", "compensation"],
    });
    return res.status(200).json(jobPosts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "server error" });
  }
};

const getJobPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const jobPostDetail = await models.jobPostings.findOne({
      include: [
        {
          model: models.companies,
          attributes: ["id", "name", "country", "region"],
        },
        {
          model: models.skills,
          attributes: ["name"],
          through: { attributes: [] },
        },
        // {
        //   model: models.jobPostings,
        //   as: "sub_jobPost",
        //   attributes: [["id", "jobPost_id"]],
        // },
      ],
      attributes: [["id", "jobPost_id"], "position", "compensation", "content"],
      where: { id },
    });
    const companyId = jobPostDetail.dataValues.company.id;
    const jobPost_id = jobPostDetail.dataValues.jobPost_id;
    const otherPosts = await models.jobPostings.findAll({
      attributes: [["id", "jobPost_id"]],
      where: {
        companyId,
        id: {
          [Op.ne]: jobPost_id,
        },
      },
    });

    jobPostDetail.dataValues.otherPosts = otherPosts;

    return res.status(200).json(jobPostDetail);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "server error" });
  }
};

module.exports = {
  getJobPostAll,
  postJob,
  updateJobPost,
  deleteJobPost,
  getJobPost,
};
