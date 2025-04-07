import { createContext, useState, useContext, useEffect } from "react";
import { useUser } from "./UserContext";

const FinancialContext = createContext();

export const FinancialProvider = ({ children }) => {
  const { user, setUser } = useUser();
  
  const [finances, setFinances] = useState({
    expenses: [],
    income: 0,
    postTaxIncome: 0
  });

  //user reloads page
  useEffect(() => {
    const loggedInUser = localStorage.getItem('userData');

    if (loggedInUser != null) {
      setUser(JSON.parse(loggedInUser));
      const income = JSON.parse(localStorage.getItem('userIncome'));
      const expenses = JSON.parse(localStorage.getItem('userExpenses'));
      updateFinances('income', income);
      updateFinances('expenses', expenses);
    }
    else {
      setFinances({
        expenses: [],
        income: 0,
        postTaxIncome: 0
      });
    }
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
    <FinancialContext.Provider value={{finances, updateFinances, setFinances, addExpense, removeExpense, calculatePostTaxIncome}}>
      {children}
    </FinancialContext.Provider>
  );
}

export const useFinances = () => {
  return useContext(FinancialContext);
}
