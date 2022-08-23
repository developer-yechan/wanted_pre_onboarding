const models = require("../database/models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const checkExistingApply = async (UserId, jobPostingId) => {
  const existingApply = await models.applies.findOne({
    where: {
      UserId,
      jobPostingId,
    },
  });
  return existingApply;
};

const createApply = async (UserId, jobPostingId) => {
  await models.applies.create({
    UserId,
    jobPostingId,
  });
};

module.exports = { checkExistingApply, createApply };
