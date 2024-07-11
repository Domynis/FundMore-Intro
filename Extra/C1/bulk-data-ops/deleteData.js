const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "bulkdata",
  password: "postgres",
  port: 5432,
});

const dataDelete = () => {
  const deleteQuery = "DELETE FROM data WHERE id <= 2000000";
  return pool.connect().then((client) => {
    return client
      .query("BEGIN")
      .then(() => client.query(deleteQuery))
      .then(() => client.query("COMMIT"))
      .catch((err) => {
        return client.query("ROLLBACK");
      })
      .finally(() => client.release());
  });
};

dataDelete()
  .then(() => {
    console.log("Data deleted successfully!");
    pool.end();
  })
  .catch((err) => {
    console.error(err);
    pool.end();
  });
