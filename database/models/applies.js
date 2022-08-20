module.exports = (sequelize, DataTypes) => {
  const applies = sequelize.define(
    "applies",
    {
      UserId: {
        type: DataTypes.INTEGER(),
        allowNull: false,
      },
      jobPostingId: {
        type: DataTypes.INTEGER(),
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );
  return applies;
};
