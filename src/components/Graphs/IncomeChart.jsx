import { Chart as ChartJS } from 'chart.js/auto';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { useUser } from '../../UserContext';
import { useFinances } from '../../FinancialContext';

const IncomeChart = ({ postTaxIncomeTotal }) => {
  const { user } = useUser();
  const { updateFinances, finances } = useFinances();
  const expenses = finances.expenses;

  const chartData = {
    labels: expenses.map((expense) => expense.ExpenseName),
    datasets: [
      {
        data: expenses.map((expense) => expense.Cost)

      }
    ]
  }

  return(
    <div>

    </div>
  )
}

export default IncomeChart;