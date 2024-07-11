const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "bulkdata",
  password: "postgres",
  port: 5432,
});

const updateData = () => {
    const updateQuery = 'UPDATE data SET value = value + 52 WHERE id <= 2000000';
    return pool.connect()
    .then(client => {
        return client.query('BEGIN')
            .then(() => client.query(updateQuery))
            .then(() => client.query('COMMIT'))
            .catch(err => {
                console.error(err);
                return client.query('ROLLBACK');
            })
            .finally(() => client.release());
    });
};

updateData()
.then(() => {
    console.log("Data updated succesfully!");
    pool.end();
})
.catch(err => {
    console.error(err);
    pool.end();
});