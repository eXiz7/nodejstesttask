module.exports = {
    development: {
      operatorsAliases: false,
      dialect: "sqlite",
      storage: "./db.dev.sqlite"
    },
    test: {
      dialect: "sqlite",
      storage: ":memory:"
    },
    production: {
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      host: process.env.DB_HOSTNAME,
      dialect: 'mysql',
    },
    secret: "secret"
};