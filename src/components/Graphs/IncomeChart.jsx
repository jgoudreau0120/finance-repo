import { Chart as ChartJS } from 'chart.js/auto';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { useUser } from '../../UserContext';
import { useFinances } from '../../FinancialContext';
import styles from './IncomeChart.module.css';

const IncomeChart = ({ postTaxIncomeTotal, totalIncomeTax }) => {
  const { user } = useUser();
  const { updateFinances, finances } = useFinances();
  const expenses = finances.expenses;

  let expensesTotal = 0;

  //Calculate expenses total cost
  for (let i = 0; i < expenses.length; i++){
    expensesTotal += parseFloat(expenses[i].Cost);
  }

  const chartData = {
    labels: ['Monthly Expenses', 'Remaining Income', 'Income Tax'],
    datasets: [
      {
        data: [expensesTotal, (postTaxIncomeTotal / 12 - expensesTotal).toFixed(2), (totalIncomeTax / 12).toFixed(2)],
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
      }
    }
  };

  return(
    <div className={styles.chartContainer}>
      <h4>Monthly Allocation Chart (USD)</h4>
      <Doughnut data={chartData} options={options}></Doughnut>
    </div>
  )
}

export default IncomeChart;