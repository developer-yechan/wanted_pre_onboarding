const models = require("../database/models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const employRepos = require("../repos/employment");

const postJob = async (req, res, next) => {
  try {
    const { companyId, position, compensation, content, skills } = req.body;
    const existingPost = await employRepos.checkExistingPost(
      companyId,
      position
    );
    if (existingPost) {
      return res.status(400).json({ message: "동일한 채용공고가 존재합니다." });
    }
    await employRepos.createPost(companyId, position, compensation, content);
    const createdPost = await employRepos.checkExistingPost(
      companyId,
      position
    );
    const postId = createdPost.id;
    if (skills.length > 0) {
      for (let i = 0; i < skills.length; i++) {
        await models.requiredSkills.create({
          skillId: skills[i],
          jobPostingId: postId,
        });
      }
    }
    return res.status(200).json({ message: "jobPosting is created" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const updateJobPost = async (req, res, next) => {
  try {
    const { id, companyId, position, compensation, content, skills } = req.body;
    const existingPost = await employRepos.checkDeletedPost(id);
    if (!existingPost) {
      return res.status(400).json({ message: "이미 삭제된 공고입니다." });
    }
    const updatedPost = await employRepos.updateJobPost(
      id,
      companyId,
      position,
      compensation,
      content
    );
    const skillsByJobPosting = await employRepos.getSkillsByPosting(id);
    const updatePostingSkills = await employRepos.updatePostingSkills(
      id,
      skillsByJobPosting,
      skills
    );

    if (updatedPost[0] == 0 && !updatePostingSkills) {
      return res.status(400).json({ message: "내용이 변경되지 않았습니다." });
    }
    return res.status(200).json({ message: "jobPosting is updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const deleteJobPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedPost = await employRepos.deleteJobPost(id);
    if (!deletedPost) {
      return res.status(400).json({ message: "이미 삭제된 공고입니다." });
    }
    return res.status(200).json({ message: "jobPosting is deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const getJobPostAll = async (req, res, next) => {
  try {
    const jobPosts = await employRepos.getJobPostAll();
    return res.status(200).json(jobPosts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const getJobPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const jobPostDetail = await employRepos.getJobPost(id);
    const companyId = jobPostDetail.dataValues.company.id;
    const jobPost_id = jobPostDetail.dataValues.jobPost_id;
    const otherPosts = await employRepos.findOtherPosts(companyId, jobPost_id);
    jobPostDetail.dataValues.otherPosts = otherPosts;
    return res.status(200).json(jobPostDetail);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getJobPostAll,
  postJob,
  updateJobPost,
  deleteJobPost,
  getJobPost,
};
