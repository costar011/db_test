const express = require("express");
const morgan = require("morgan");
const mysql2 = require("mysql2");

const PORT = 4000;
const app = express();

const db = mysql2.createPool({
  port: "3309",
  host: "127.0.0.1",
  databases: "scott",
  user: "root",
  password: "fourleaf0309",
});

app.use(morgan("dev"));

app.get("/", (req, res) => {
  const selectQuery = `
        SELECT EMPNO,
               ENAME,
               JOB,
               HIREDATE,
               SAL,
               DEPTNO,
          FROM EMP
    `;
  db.query(selectQuery, (err, rows) => {
    if (err) {
      console.error(err);
    }
    res.json(rows);
  });
});

app.listen(PORT, () => {
  console.log(`${PORT}  server start `);
});
