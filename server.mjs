import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';

let database = mysql.createConnection({
  host: 'financeyourway.c9qmwk00a1cu.us-east-2.rds.amazonaws.com',
  user: 'admin',
  password: 'AWSHype2002;',
  database: 'financeyourway',
  port: 3306
});

let serverPort = 8080;
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

app.post("/check-login", (request, response) => {
  
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

app.get("/pull-income/:username", (request, response) => {
  const { username } = request.params;

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

app.post("/add-income", (request, response) => {

  const { username, income } = request.body;

  if (!username || !income || isNaN(income)) {
    return response.status(400).json({error: "All fields are required or there are errors in the fields. Ensure income is non-negative"})
  }

  const query = `INSERT INTO incomeRecords (Username, Income) VALUES ('${username}', ${income})`;

  database.query(query, (error, result) => {
    if (error){
      return response.status(500).json({error: "Database error"});
    }
    
    return response.status(201).json({message: `Income successfully added!`});
  });
});

app.patch("/change-income", (request, response) => {

  const { username, income } = request.body;

  if (!username || !income || isNaN(income)) {
    return response.status(400).json({error: "All fields are required or there are errors in the fields. Ensure income is non-negative"})
  }

  const query = `UPDATE incomeRecords SET Income = ${income} WHERE Username = '${username}'`;

  database.query(query, (error, result) => {
    if (error){
      return response.status(500).json({error: "Database error"});
    }
    
    return response.status(201).json({message: `Income successfully changed!`});
  });
});

app.get("/pull-expenses/:username", (request, response) => {

  const { username } = request.params;

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

app.post("/add-expense", (request, response) => {

  const { username, description, cost } = request.body;

  if (!username || !description || !cost || isNaN(cost)) {
    return response.status(400).json({error: "All fields are required or there are errors in the fields. Ensure cost is non-negative"})
  }

  const query = `INSERT INTO monthlyExpenses (Username, ExpenseName, Cost) VALUES ('${username}', '${description}', ${cost})`;

  database.query(query, (error, result) => {
    if (error){
      return response.status(500).json({error: "Database error"});
    }
    
    return response.status(201).json({message: `${description} successfully added!`});
  });
});

app.patch("/change-expense", (request, response) => {

  const { username, expenseName, cost } = request.body;

  if (!username || !income || isNaN(income)) {
    return response.status(400).json({error: "All fields are required or there are errors in the fields. Ensure income is non-negative"})
  }

  const query = `UPDATE monthlyExpenses SET Cost = ${cost} WHERE Username = '${username}' AND ExpenseName = '${expenseName}'`;

  database.query(query, (error, result) => {
    if (error){
      return response.status(500).json({error: "Database error"});
    }
    
    return response.status(201).json({message: `Expense successfully changed!`});
  });
});

app.listen(serverPort, () => {
  console.log(`Listening on port ${serverPort}`);
});