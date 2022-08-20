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
    }
  );
  return skills;
};
