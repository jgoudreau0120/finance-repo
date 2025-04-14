import { Doughnut } from 'react-chartjs-2';
import { useFinances } from '../../FinancialContext';
import styles from './Chart.module.css';

const IncomeChart = () => {
  const { finances } = useFinances();
  const expenses = finances.expenses;

  let expensesTotal = 0;

  //Calculate expenses total cost
  for (let i = 0; i < expenses.length; i++){
    expensesTotal += parseFloat(expenses[i].Cost);
  }

  const toUSD = (float) => {
    let value = '';
    value = parseFloat(float).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    });
    return value;
  };

  const chartData = {
    labels: ['Monthly Expenses', 'Remaining Income', 'Income Tax'],
    datasets: [
      {
        data: [(expensesTotal), (finances.postTaxIncome / 12 - expensesTotal).toFixed(2), ((finances.income - finances.postTaxIncome) / 12).toFixed(2)],
        backgroundColor: [ '#f00', '#0f0', '#00f'],
        borderColor: 'transparent',
        borderWidth: 3
      }
    ]
  };


  const options = {
    plugins: {
      legend: {
        labels: {
          color: '#fff'
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const value = context.raw;
            return `${toUSD(value)}`;
          }
        }
      }
    }
  };

  return(
    <div className={styles.chartContainer}>
      <h4>Monthly Allocation Chart</h4>
      <Doughnut data={chartData} options={options}></Doughnut>
    </div>
  )
}

export default IncomeChart;