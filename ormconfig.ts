module.exports = {
  "type": "mysql",
  "host": process.env.APP_DBHOST,
  "port": 3306,
  "username": process.env.APP_DBUSERNAME,
  "password": process.env.APP_DBPASSWORD,
  "database": process.env.APP_DBNAME,
  "synchronize": true,
  "logging": false,
  entities: ["entities/*.js"],
  migrations: [
    "src/migration/*.ts"
  ],
  cli: {
    migrationsDir: "src/migration"
  }
};