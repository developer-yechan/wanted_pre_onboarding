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
    }
  );
  return required_skills;
};
