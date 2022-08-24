const models = require("../database/models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const checkExistingPost = async (companyId, position) => {
  const existingPost = await models.jobPostings.findOne({
    attributes: ["id"],
    where: {
      companyId,
      position,
    },
  });
  return existingPost;
};

const checkDeletedPost = async (id) => {
  const existingPost = await models.jobPostings.findOne({
    attributes: ["id"],
    where: {
      id,
    },
  });
  return existingPost;
};

const createPost = async (companyId, position, compensation, content) => {
  await models.jobPostings.create({
    companyId,
    position,
    compensation,
    content,
  });
};

const updateJobPost = async (
  id,
  companyId,
  position,
  compensation,
  content
) => {
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
  return updatedPost;
};

const deleteJobPost = async (id) => {
  const deletedPost = await models.jobPostings.destroy({
    where: { id },
  });
  return deletedPost;
};

const getJobPostAll = async () => {
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
  return jobPosts;
};

const getJobPost = async (id) => {
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
  return jobPostDetail;
};

const findOtherPosts = async (companyId, jobPost_id) => {
  const otherPosts = await models.jobPostings.findAll({
    attributes: [["id", "jobPost_id"]],
    where: {
      companyId,
      id: {
        [Op.ne]: jobPost_id,
      },
    },
  });
  return otherPosts;
};

const getSkillsByPosting = async (id) => {
  const skillsByJobPosting = await models.requiredSkills.findAll({
    attributes: ["skillId"],
    where: {
      jobPostingId: id,
    },
  });
  return skillsByJobPosting;
};

const updatePostingSkills = async (id, skillsByJobPosting, newSkills) => {
  let getSkills = [];
  if (skillsByJobPosting.length > 0) {
    getSkills = skillsByJobPosting.map((element, idx) => {
      return element.dataValues.skillId;
    });
  }

  const intersection = getSkills.filter((element) =>
    newSkills.includes(element)
  );
  const tmpArr = newSkills.length > getSkills.length ? newSkills : getSkills;
  if (newSkills.length > 0 && intersection.length !== tmpArr.length) {
    await models.requiredSkills.destroy({
      where: { jobPostingId: id },
    });
    for (let i = 0; i < newSkills.length; i++) {
      await models.requiredSkills.create({
        skillId: newSkills[i],
        jobPostingId: id,
      });
    }
  } else if (newSkills.length === 0) {
    await models.requiredSkills.destroy({
      where: { jobPostingId: id },
    });
  }
  return intersection.length !== tmpArr.length;
};
module.exports = {
  checkExistingPost,
  createPost,
  checkDeletedPost,
  updateJobPost,
  deleteJobPost,
  getJobPostAll,
  getJobPost,
  findOtherPosts,
  getSkillsByPosting,
  updatePostingSkills,
};
