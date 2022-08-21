module.exports = {
  HOST: "localhost",
  USER: "yechankim",
  PASSWORD: "123",
  DB: "wanted",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
