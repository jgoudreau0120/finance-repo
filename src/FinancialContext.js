import { createContext, useState, useContext } from "react";

const FinancialContext = createContext();

export const FinancialProvider = ({ children }) => {
  const [finances, setFinances] = useState({
    expenses: null,
    income: 0
  });

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
    <FinancialContext.Provider value={{finances, updateFinances, setFinances, addExpense, removeExpense}}>
      {children}
    </FinancialContext.Provider>
  );
}

export const useFinances = () => {
  return useContext(FinancialContext);
}
