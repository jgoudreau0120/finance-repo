import express from 'express';
import dbOperation from './dbFiles/dbOperation.js';
import cors from 'cors';
import { Employee } from './dbFiles/employee.js';
import mysql from 'mysql2';
import dbConfig from './dbFiles/dbConfig.js';

let database = mysql.createConnection({
  host: 'financeyourway.c9qmwk00a1cu.us-east-2.rds.amazonaws.com',
  user: 'admin',
  password: 'AWSHype2002;',
  database: 'financeyourway',
  port: 3306
});

let serverPort = 8000;
const app = express();
app.use(express.json());
app.use(cors());

app.post("/create-user", (request, response) => {
  const { firstName, lastName, username, password } = request.body;

  if (!firstName || !lastName || !username || !password) {
    return response.status(400).json({error: "All fields are required"})
  }
  const query = `INSERT INTO users (FirstName, LastName, Username, Password) VALUES ('${firstName}', '${lastName}', '${username}', '${password}')`;

  database.query(query, (error, result) => {
    if (error){
      console.error(`Error inserting user: ${error}`);
      return response.status(500).json({error: "database error"});
    }
    return response.status(201).json({message: "User created successfully"});
  });
});
// let Pam = new Employee(1002, 'Pam', 'Beezley', 29, 'Female');
// //dbOperation.createEmployee(Pam);

// dbOperation.getEmployees().then(response => {
//   console.log(response.recordset);
// });

// app.get("/1", (request, response) => {
//   const query = "SELECT * FROM financeyourway.users";
//   database.query(query, (error, data) => {
//     if(error) return response.json("Error");
//     return response.json(data);
//   })
// });


app.listen(serverPort, () => {
  console.log(`Listening on port ${serverPort}`);
})
