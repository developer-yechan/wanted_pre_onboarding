module.exports = (sequelize, DataTypes) => {
  const required_skills = sequelize.define(
    "required_skills",
    {
      skillId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      jobPostingId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  return required_skills;
};
