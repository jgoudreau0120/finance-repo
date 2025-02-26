import express from 'express';
import dbOperation from './dbFiles/dbOperation.js';
import cors from 'cors';
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

app.get("/check-login", (request, response) => {
  const { username, password } = request.body;

  if (!username || !password) {
    return response.status(400).json({error: "All fields are required"})
  }

  const query = `SELECT * FROM users WHERE Username = '${username}'`;

  database.query(query, (error, result) => {
    if (error){
      console.error(`Error retrieving user: ${error}`);
      return response.status(500).json({error: "database error"});
    }
    
    const userData = result[0];
    
    if(!userData){
      return response.status(404).json({error: "User not found"});
    }

    if(userData.Password !== password){
      return response.status(201).json({message: "Username or password is incorrect"});
    }
    
    return response.status(201).json({message: `Welcome ${userData.FirstName}!`, 
      user: {
        id: userData.id,
        FirstName: userData.FirstName,
        LastName: userData.LastName,
        Username: userData.Username
    }});
  });
});

app.get("/pull-income", (request, response) => {
  const { username } = request.body;

  if (!username) {
    return response.status(400).json({error: "All fields are required"})
  }

  const query = `SELECT Income FROM incomeRecords WHERE Username = '${username}'`;

  database.query(query, (error, result) => {
    if (error){
      return response.status(500).json({error: "Database error"});
    }
    
    const incomeData = result[0];
    
    if(!incomeData){
      return response.status(404).json({error: "Income not found"});
    }
    
    return response.status(201).json({message: `Income acquired`, income: incomeData.Income});
  });
});

app.get("/pull-expenses", (request, response) => {
  const { username } = request.body;

  if (!username) {
    return response.status(400).json({error: "All fields are required"})
  }

  const query = `SELECT * FROM monthlyExpenses WHERE Username = '${username}'`;

  database.query(query, (error, result) => {
    if (error){
      return response.status(500).json({error: "Database error"});
    }
    
    const expenseData = result;
    
    if(!expenseData){
      return response.status(404).json({error: "Expenses not found"});
    }
    
    return response.status(201).json({message: `Expenses acquired`, expenses: expenseData});
  });
});

app.listen(serverPort, () => {
  console.log(`Listening on port ${serverPort}`);
})
