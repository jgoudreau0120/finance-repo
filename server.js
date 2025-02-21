import express from 'express';
import dbOperation from './dbFiles/dbOperation.js';
import cors from 'cors';
import { Employee } from './dbFiles/employee.js';


let Pam = new Employee(1002, 'Pam', 'Beezley', 29, 'Female');
//dbOperation.createEmployee(Pam);

dbOperation.getEmployees().then(response => {
  console.log(response.recordset);
});