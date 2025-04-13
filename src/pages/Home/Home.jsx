import 'bootstrap/dist/css/bootstrap.min.css';
import { useFinances } from '../../FinancialContext';
import { useUser } from '../../UserContext';
import styles from './Home.module.css';
import Tile from '../../components/Tiles/Tile';
import '../../App.css';
import { useNavigate } from "react-router-dom";
import IncomeChart from '../../components/Graphs/IncomeChart';
import { useState, useEffect } from 'react';

const Home = () => {
  const { user } = useUser();
  const { finances } = useFinances();
  const navigate = useNavigate();

  const toUSD = (float) => {
    let value = '';
    value = parseFloat(float).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    });
    return value;
  };

  let expenseTotal = 0;
  let expenseEntries = [];

  //Make calculations with expenses
  if (finances.expenses.length > 0){
    const expenses = finances.expenses;

    for(let i = 0; i < expenses.length; i++){
      expenseTotal += (parseFloat(expenses[i].Cost));
      expenseEntries.push(expenses[i]);
    }

    expenseTotal = parseFloat(expenseTotal.toFixed(2));
  }

  let budgetTotalPercent = 0;
  let budgetTotal = 0;
  //Make calculations with expenses
  if (finances.budgetRecords.length > 0){

    for(let i = 0; i < finances.budgetRecords.length; i++){
      budgetTotalPercent += finances.budgetRecords[i].PercentIncomeAllocated;
      budgetTotal += (finances.budgetRecords[i].PercentIncomeAllocated / 100) * (finances.postTaxIncome - (expenseTotal * 12));
    }

  }


  return (
    <div className={styles.home}>
      <div className={styles.tileRow}>
        <Tile title='Budgeting' link='/budgeting'>
          <h4>{budgetTotalPercent}% / 100%</h4>
          <h4>{toUSD(budgetTotal)} / {toUSD(finances.postTaxIncome - (expenseTotal * 12))}</h4>
        </Tile>

        <Tile title='Income'>
          <h4>Gross:</h4>
          <h4>
            {toUSD(finances.income)}
          </h4>
          <h4>Post-tax:</h4>
          <h4>
            {toUSD(finances.postTaxIncome)}
          </h4>
          <IncomeChart postTaxIncomeTotal={finances.postTaxIncome} totalIncomeTax={(finances.income - finances.postTaxIncome)}></IncomeChart>
        </Tile>

        <Tile title='Expenses'>
          <h4>
            {toUSD(expenseTotal)}
          </h4>
          <ul className={styles.expenseList}>
            {expenseEntries.map((entry) => (
              <li><h4 className={styles.name}>{entry.ExpenseName}:</h4><h4 className={styles.price}>${entry.Cost}/mo</h4></li>
            ))}
          </ul>
        </Tile>

      </div>

    </div>
  )
}

export default Home;