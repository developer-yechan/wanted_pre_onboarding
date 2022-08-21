const Sequelize = require("sequelize");
const dbConfig = require("../config/config.js");
const db = {};

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.users = require("./users")(sequelize, Sequelize);
db.companies = require("./companies")(sequelize, Sequelize);
db.jobPostings = require("./jobPostings")(sequelize, Sequelize);
db.skills = require("./skills")(sequelize, Sequelize);
db.requiredSkills = require("./requiredSkills")(sequelize, Sequelize);
db.applies = require("./applies")(sequelize, Sequelize);

db.users.belongsToMany(db.jobPostings, {
  through: db.applies,
});

db.jobPostings.belongsToMany(db.users, {
  through: db.applies,
});

db.companies.hasMany(db.jobPostings, {
  foreignKey: "companyId",
});
db.jobPostings.belongsTo(db.companies);

db.skills.belongsToMany(db.jobPostings, {
  through: db.requiredSkills,
});

db.jobPostings.belongsToMany(db.skills, {
  through: db.requiredSkills,
});

// db.jobPostings.hasMany(db.jobPostings, {
//   as: "sub_jobPost",
//   foreignKey: "companyId",
// });
// db.jobPostings.belongsTo(db.jobPostings, {
//   foreignKey: "companyId",
// });

module.exports = db;
