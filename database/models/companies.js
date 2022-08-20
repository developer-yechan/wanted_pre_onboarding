module.exports = (sequelize, DataTypes) => {
  const companies = sequelize.define(
    "companies",
    {
      name: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      region: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );
  return companies;
};
