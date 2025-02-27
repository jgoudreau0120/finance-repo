import { createContext, useState, useContext } from "react";

const FinancialContext = createContext();

export const FinancialProvider = ({ children }) => {
  const [finances, setFinances] = useState({
    expenses: [],
    income: 0
  });

  const updateFinances = (field, value) => {
    setFinances(prevFinance => ({
      ...prevFinance,
      [field]: value
    }));
  };

  const addExpense = (newExpense) => {
    setFinances((prevExpenses) => ({
      ...prevExpenses,
      expenses: [...prevExpenses.expenses, newExpense]
    }));
  };

  return(
    <FinancialContext.Provider value={{finances, updateFinances, setFinances}}>
      {children}
    </FinancialContext.Provider>
  );
}

export const useFinances = () => {
  return useContext(FinancialContext);
}
