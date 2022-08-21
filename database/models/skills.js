module.exports = (sequelize, DataTypes) => {
  const skills = sequelize.define(
    "skills",
    {
      name: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
    },
    {
      timestamps: false,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  return skills;
};
