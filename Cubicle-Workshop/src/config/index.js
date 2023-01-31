const config = {
  production: { PORT: 1234 },
  development: { PORT: 5000, DB_URI: "mongodb://127.0.0.1:27017/cubicle" },
};

module.exports = config[process.env.NODE_ENV || "development"];
