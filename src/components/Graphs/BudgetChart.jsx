import { Chart as ChartJS } from 'chart.js/auto';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { useUser } from '../../UserContext';
import { useFinances } from '../../FinancialContext';
import styles from './Chart.module.css';

const BudgetChart = ({ budgetTotal, budgetTotalPercent }) => {
  const { user } = useUser();
  const { updateFinances, finances } = useFinances();
  const expenses = finances.expenses;

  const chartData = {
    labels: ['Monthly Expenses', 'Remaining Income', 'Income Tax'],
    datasets: [
      {
        data: [],
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

export default BudgetChart;