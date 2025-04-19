import { createContext, useState, useContext, useEffect } from "react";
import { useUser } from "./UserContext";
import { BrowserRouter, Route, Routes, Link, useLocation } from "react-router-dom";
import classNames from 'classnames';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const FinancialContext = createContext();
const apiUrl = 'https://saqarapux2.us-east-2.awsapprunner.com';

export const FinancialProvider = ({ children }) => {
  const { user, setUser } = useUser();
  
  const [finances, setFinances] = useState({
    expenses: [],
    income: 0,
    postTaxIncome: 0,
    budgetRecords: []
  });

  const fetchFinances = async (username) => {
    //Pull income
    try {
      const response = await axios.get(`${apiUrl}/pull-income/${username}`);
      const income = response.data.income;

      if (income) {
        updateFinances('income', income);
        localStorage.setItem('userIncome', JSON.stringify(income));
      }
      else {
        alert("Couldn't pull income for user");
      }
    }
    catch (e) {
      if (e.response.status === 404){
        updateFinances('income', 0);
        localStorage.setItem('userIncome', 0);
      }
    }
    //Pull expenses
    try {
      const response = await axios.get(`${apiUrl}/pull-expenses/${username}`);
      const expenses = response.data.expenses;

      if (expenses) {
        updateFinances('expenses', expenses);
        localStorage.setItem('userExpenses', JSON.stringify(expenses));
      }
      else {
        alert("Couldn't pull expenses for user")
      }
    }
    catch (e) {
      if (e.response.status === 404){
        updateFinances('expenses', []);
        localStorage.setItem('userExpenses', []);
      }
    }
    //Pull budget
    try {
      const response = await axios.get(`${apiUrl}/pull-budgeting/${username}`);
      const budget = response.data.budget;

      if (budget) {
        updateFinances('budgetRecords', budget);
        localStorage.setItem('userBudget', JSON.stringify(budget));
      }
      else {
        alert("Couldn't pull budget for user");
      }
    }
    catch (e) {
      if (e.response.status === 404){
        updateFinances('budgetRecords', []);
        localStorage.setItem('userBudget', []);
      }
    }
  };

  //user reloads page
  useEffect(() => {
    const loggedInUser = localStorage.getItem('userData');
  
    const loadData = async () => {
      if (loggedInUser != null) {
        const userObj = JSON.parse(loggedInUser);
        setUser(userObj);
        await fetchFinances(userObj.Username);
      } 
      else {
        setFinances({
          expenses: [],
          income: 0,
          postTaxIncome: 0
        });
      }
    };
  
    loadData();  // call the async function
  }, [setUser, setFinances]);
  

  useEffect(() => {
    if (user && finances.income > 0) {
      calculatePostTaxIncome();
    }
  }, [user, finances.income]);


  const calculatePostTaxIncome = () => {
    let federalTaxOwed = 0;
    let data = [];
    let income = finances.income;

    switch (user.TaxFilingStatus){
      case 'Single':
        data = [
          [11926, 48475, 1193, 0.12, 11925],
          [48476, 103350, 5579, 0.22, 48475],
          [103351, 197300, 17651, 0.24, 103350],
          [197301, 250525, 40199, 0.32, 197300],
          [250526, 626350, 57231, 0.35, 250525]
        ];
  
        if (income < data[0][0]){
          federalTaxOwed = income * 0.1;
        }
        else if (income > data[0][0] && income < data[0][1]){
          federalTaxOwed = data[0][2] + (data[0][3] * (income - data[0][4]));
        }
        else if (income > data[1][0] && income < data[1][1]){
          federalTaxOwed = data[1][2] + (data[1][3] * (income - data[1][4]));
        }
        else if (income > data[2][0] && income < data[2][1]){
          federalTaxOwed = data[2][2] + (data[2][3] * (income - data[2][4]));
        }
        else if (income > data[3][0] && income < data[3][1]){
          federalTaxOwed = data[3][2] + (data[3][3] * (income - data[3][4]));
        }
        else if (income > data[4][0] && income < data[4][1]){
          federalTaxOwed = data[4][2] + (data[4][3] * (income - data[4][4]));
        }
        else {
          federalTaxOwed = 188769.75 + (0.37 * (income - 626350));
        }
  
        break;
  
      case 'Married Filing Jointly':
        data = [
          [23851, 96950, 2385, 0.12, 23850],
          [96951, 206700, 11157, 0.22, 96950],
          [206701, 394600, 35302, 0.24, 206700],
          [394601, 501050, 80398, 0.32, 394600],
          [501051, 751600, 114462, 0.35, 501050]
        ];
  
        if (income < data[0][0]){
          federalTaxOwed = income * 0.1;
        }
        else if (income > data[0][0] && income < data[0][1]){
          federalTaxOwed = data[0][2] + (data[0][3] * (income - data[0][4]));
        }
        else if (income > data[1][0] && income < data[1][1]){
          federalTaxOwed = data[1][2] + (data[1][3] * (income - data[1][4]));
        }
        else if (income > data[2][0] && income < data[2][1]){
          federalTaxOwed = data[2][2] + (data[2][3] * (income - data[2][4]));
        }
        else if (income > data[3][0] && income < data[3][1]){
          federalTaxOwed = data[3][2] + (data[3][3] * (income - data[3][4]));
        }
        else if (income > data[4][0] && income < data[4][1]){
          federalTaxOwed = data[4][2] + (data[4][3] * (income - data[4][4]));
        }
        else {
          federalTaxOwed = 202154.50 + (0.37 * (income - 751600));
        }
  
        break;
  
      case 'Married Filing Separately':
        data = [
          [11926, 48475, 1193, 0.12, 11925],
          [48476, 103350, 5579, 0.22, 48475],
          [103351, 197300, 17651, 0.24, 103350],
          [197301, 250525, 40199, 0.32, 197300],
          [250526, 375800, 57231, 0.35, 250525]
        ];
  
        if (income < data[0][0]){
          federalTaxOwed = income * 0.1;
        }
        else if (income > data[0][0] && income < data[0][1]){
          federalTaxOwed = data[0][2] + (data[0][3] * (income - data[0][4]));
        }
        else if (income > data[1][0] && income < data[1][1]){
          federalTaxOwed = data[1][2] + (data[1][3] * (income - data[1][4]));
        }
        else if (income > data[2][0] && income < data[2][1]){
          federalTaxOwed = data[2][2] + (data[2][3] * (income - data[2][4]));
        }
        else if (income > data[3][0] && income < data[3][1]){
          federalTaxOwed = data[3][2] + (data[3][3] * (income - data[3][4]));
        }
        else if (income > data[4][0] && income < data[4][1]){
          federalTaxOwed = data[4][2] + (data[4][3] * (income - data[4][4]));
        }
        else {
          federalTaxOwed = 101077.25 + (0.37 * (income - 375800));
        }
        break;
  
      case 'Head of Household':
        data = [
          [17001, 64850, 1700, 0.12, 17000],
          [64851, 103350, 7442, 0.22, 64850],
          [103351, 197300, 15912, 0.24, 103350],
          [197301, 250500, 38460, 0.32, 197300],
          [250001, 626350, 55484, 0.35, 250500]
        ];
  
        if (income < data[0][0]){
          federalTaxOwed = income * 0.1;
        }
        else if (income > data[0][0] && income < data[0][1]){
          federalTaxOwed = data[0][2] + (data[0][3] * (income - data[0][4]));
        }
        else if (income > data[1][0] && income < data[1][1]){
          federalTaxOwed = data[1][2] + (data[1][3] * (income - data[1][4]));
        }
        else if (income > data[2][0] && income < data[2][1]){
          federalTaxOwed = data[2][2] + (data[2][3] * (income - data[2][4]));
        }
        else if (income > data[3][0] && income < data[3][1]){
          federalTaxOwed = data[3][2] + (data[3][3] * (income - data[3][4]));
        }
        else if (income > data[4][0] && income < data[4][1]){
          federalTaxOwed = data[4][2] + (data[4][3] * (income - data[4][4]));
        }
        else {
          federalTaxOwed = 187031.50 + (0.37 * (income - 626350));
        }
        break;
    }

    let stateTaxOwed = income * user.StateTaxRate / 100;

    setFinances(prevFinance => {
      return {
        ...prevFinance,
        postTaxIncome: income - federalTaxOwed - stateTaxOwed
      };
    });

  }

  const updateFinances = (field, value) => {
    setFinances(prevFinance => {
      return {
        ...prevFinance,
        [field]: value
      };
    });
  };

  const addExpense = (newExpense) => {
    setFinances((prevFinances) => {
      return {
      ...prevFinances,
      expenses: [...prevFinances.expenses, newExpense]
      };
    });
  };

  const removeExpense = (expenseToRemove) => {
    setFinances((prevFinances) => {
      return {
        ...prevFinances,
        expenses: prevFinances.expenses.filter((expense) => expense.ExpenseName !== expenseToRemove)
      }
    })
  };

  return(
    <FinancialContext.Provider value={{finances, updateFinances, setFinances, addExpense, removeExpense, calculatePostTaxIncome, fetchFinances}}>
      {children}
    </FinancialContext.Provider>
  );
}

export const useFinances = () => {
  return useContext(FinancialContext);
}
