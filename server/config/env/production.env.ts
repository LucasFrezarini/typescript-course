module.exports = {
  env:        "production",
  db:         "ts_api",
  dialect:    "postgres",
  username:   "postgres",
  password:   "pgroot",
  host:       "localhost",
  serverPort: 3000,
  pgPort:     5432,
  dbUrl:      "postgres://postgres:pgroot@localhost:5432/ts_api",
  secret:     "s3cr3t"
};
