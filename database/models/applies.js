module.exports = (sequelize, DataTypes) => {
  const applies = sequelize.define(
    "applies",
    {
      UserId: {
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
  return applies;
};
