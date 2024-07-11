const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "bulkdata",
  password: "postgres",
  port: 5432,
});

const generateData = (numRows) => {
  let data = [];

  for (let i = 0; i < numRows; i++) {
    data.push(`('Name${i}', ${Math.floor(Math.random() * 100)})`);
  }
  return data.join(",");
};

const insertData = (numRows) => {
  const insertQuery = `INSERT INTO data (name, value) VALUES ${generateData(
    numRows
  )} `;
  return pool.connect().then((client) => {
    return client
      .query("BEGIN")
      .then(() => client.query(insertQuery))
      .then(() => client.query("COMMIT"))
      .catch((err) => {
        console.error(err);
        return client.query("ROLLBACK");
      })
      .finally(() => client.release());
  });
};

insertData(2000000)
.then(() => {
    console.log('Data inserted successfully');
    pool.end();
})
.catch(err => {
    console.error(err);
    pool.end();
});