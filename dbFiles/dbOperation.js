import dbConfig from './dbConfig.js';
import mssql from 'mssql';

const getEmployees = async() => {
  try{
    let pool = await mssql.connect(dbConfig);
    let employees = pool.request().query("");
    console.log(employees);
    return employees;
  }
  catch (exception) {
    console.log(exception);
  }
};

const createEmployee = async(Employee) => {
  try{
    let pool = await mssql.connect(dbConfig);
    let employees = pool.request()
    .query();
    console.log(employees);
    return employees;
  }
  catch (exception) {
    console.log(exception);
  }
};

export default {getEmployees, createEmployee};