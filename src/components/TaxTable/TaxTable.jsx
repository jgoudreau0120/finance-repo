import { useUser } from '../../UserContext';
import { useFinances } from '../../FinancialContext';
import styles from './TaxTable.module.css';
import { useEffect } from 'react';

const TaxTable = ({ onFederalTaxChange }) => {
  const { updateFinances, finances } = useFinances();
  const { user, setUser } = useUser();
  let data = [];
  let firstRow = 0;
  let lastRow = 0;
  let taxLiability = 0;

  const toUSD = (float) => {
    let value = '';
    value = parseFloat(float).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    });
    return value;
  }

  useEffect(() => {
    onFederalTaxChange(taxLiability);
  }, [taxLiability, onFederalTaxChange]);

  switch (user.TaxFilingStatus){
    case 'Single':
      firstRow = <tr>
        <td>0 - {toUSD(11925)}</td>
        <td>10% of taxable income</td>
        </tr>;

      lastRow = <tr>
        <td>{toUSD(626351)} and over</td>
        <td>{toUSD(188769.75)} + 37% of the amount over {toUSD(626350)}</td>
        </tr>;

      data = [
        [11926, 48475, 1193, 12, 11925],
        [48476, 103350, 5579, 22, 48475],
        [103351, 197300, 17651, 24, 103350],
        [197301, 250525, 40199, 32, 197300],
        [250526, 626350, 57231, 35, 250525]
      ];
      break;

    case 'Married Filing Jointly':
      firstRow = <tr>
        <td>0 - {toUSD(23850)}</td>
        <td>10% of taxable income</td>
        </tr>;

      lastRow = <tr>
        <td>{toUSD(751601)} and over</td>
        <td>{toUSD(202154.50)} + 37% of the amount over {toUSD(751600)}</td>
        </tr>;

      data = [
        [23851, 96950, 2385, 12, 23850],
        [96951, 206700, 11157, 22, 96950],
        [206701, 394600, 35302, 24, 206700],
        [394601, 501050, 80398, 32, 394600],
        [501051, 751600, 114462, 35, 501050]
      ];
      break;

    case 'Married Filing Separately':
      firstRow = <tr>
        <td>0 - {toUSD(11925)}</td>
        <td>10% of taxable income</td>
        </tr>;

      lastRow = <tr>
        <td>{toUSD(375801)} and over</td>
        <td>{toUSD(101077.25)} + 37% of the amount over {toUSD(375800)}</td>
        </tr>;

      data = [
        [11926, 48475, 1193, 12, 11925],
        [48476, 103350, 5579, 22, 48475],
        [103351, 197300, 17651, 24, 103350],
        [197301, 250525, 40199, 32, 197300],
        [250526, 375800, 57231, 35, 250525]
      ];
      break;

    case 'Head of Household':
      firstRow = <tr>
        <td>0 - {toUSD(17000)}</td>
        <td>10% of taxable income</td>
        </tr>;

      lastRow = <tr>
        <td>{toUSD(626351)} and over</td>
        <td>{toUSD(187031.5)} + 37% of the amount over {toUSD(626350)}</td>
        </tr>;

      data = [
        [17001, 64850, 1700, 12, 17000],
        [64851, 103350, 7442, 22, 64850],
        [103351, 197300, 15912, 24, 103350],
        [197301, 250500, 38460, 32, 197300],
        [250001, 626350, 55484, 35, 250500]
      ];
      break;
  }

  return (
    <div className={styles.taxTableContainer}>
      <div className={styles.taxLiabilityContainer}>
      <table className={styles.taxTable}>
        <thead>
          <tr>
            <th>If Taxable Income Is:</th>
            <th>Tax Due Is:</th>
          </tr>
        </thead>
        <tbody>
          {firstRow}
          {
            data.map((arrayValue) => {
              const income = parseFloat(finances.income);
              const matchingRow = income >= arrayValue[0] && income <= arrayValue[1];

              if (matchingRow){
                taxLiability = arrayValue[2] + ((arrayValue[3]/100)*(finances.income - arrayValue[4]));
              }

              return(
                <tr className={matchingRow ? styles.highlighted : ''}>
                  <td>{toUSD(arrayValue[0])} - {toUSD(arrayValue[1])}</td>
                  <td>{toUSD(arrayValue[2])} + {arrayValue[3]}% of the amount over {toUSD(arrayValue[4])}</td>
                </tr>
              )
            })
          }
          {lastRow}
        </tbody>
      </table>
        <h3>Total Federal Tax Liability for 2025 = </h3>
        <h4><strong>{toUSD(taxLiability)}</strong></h4>
      </div>
    </div>
    
  )
}

export default TaxTable;
