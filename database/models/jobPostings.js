module.exports = (sequelize, DataTypes) => {
  const job_postings = sequelize.define(
    "job_postings",
    {
      companyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      position: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      compensation: {
        type: DataTypes.INTEGER,
      },
      content: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      timestamps: false,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  return job_postings;
};
