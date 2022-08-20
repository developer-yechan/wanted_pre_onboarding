const Sequelize = require("sequelize");
const db = {};

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./wanted.db",
});

db.users = require("./users")(sequelize, Sequelize);
db.companies = require("./companies")(sequelize, Sequelize);
db.jobPostings = require("./jobPostings")(sequelize, Sequelize);
db.skills = require("./skills")(sequelize, Sequelize);
db.requiredSkills = require("./requiredSkills")(sequelize, Sequelize);
db.applies = require("./applies")(sequelize, Sequelize);

db.users.hasMany(db.applies);
db.applies.belongsTo(db.users);

db.jobPostings.hasMany(db.applies);
db.applies.belongsTo(db.jobPostings);

db.companies.hasMany(db.jobPostings);
db.jobPostings.belongsTo(db.companies);

db.skills.hasMany(db.requiredSkills);
db.requiredSkills.belongsTo(db.skills);

db.jobPostings.hasMany(db.requiredSkills);
db.requiredSkills.belongsTo(db.jobPostings);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
