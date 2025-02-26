import { createContext, useState, useContext } from "react";

const FinancialContext = createContext();

export const FinancialProvider = ({ children }) => {
  const [finances, setFinances] = useState({
    expenses: [],
    income: 0,
    yearlyBudget: 0
  });

  const updateFinances = (field, value) => {
    setFinances(prevFinance => ({
      ...prevFinance,
      [field]: value
    }));
  }

  return(
    <FinancialContext.Provider value={{finances, updateFinances, setFinances}}>
      {children}
    </FinancialContext.Provider>
  );
}

export const useFinances = () => {
  useContext(FinancialContext);
}
