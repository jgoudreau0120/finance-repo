import { Chart as ChartJS } from 'chart.js/auto';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { useUser } from '../../UserContext';
import { useFinances } from '../../FinancialContext';
import styles from './Chart.module.css';

const BudgetChart = ({ budgetTotal, budgetTotalPercent }) => {
  const { finances } = useFinances();
  const budgets = finances.budgetRecords;

  const labels = budgets.map((record) => record.Category);
  const data = budgets.map((record) => record.PercentIncomeAllocated);

  const getRandomColorHex = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      //Generates a random number between 0 and 15 (inclusive)
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const colors = budgets.map(() => getRandomColorHex());

  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: colors,
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
            const label = context.label || '';
            const value = context.raw;
            return `${(value)}%`;
          }
        }
      }
    }
  };

  return(
    <div className={styles.chartContainer}>
      <h4>Budget Chart</h4>
      <Doughnut data={chartData} options={options}></Doughnut>
    </div>
  )
}

export default BudgetChart;