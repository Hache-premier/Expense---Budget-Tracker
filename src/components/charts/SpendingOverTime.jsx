import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useTransactions } from "../../hooks/useTransactions.js";
import { formatMoney } from "../../utils/formatMoney.js";

function SpendingOverTime() {
  const { transactions } = useTransactions();

  const spendingByDate = transactions
    .filter((transaction) => transaction.amount < 0)
    .reduce((totals, transaction) => {
      const existingDate = totals.find(
        (item) => item.date === transaction.date,
      );

      const spending = Math.abs(transaction.amount);

      if (existingDate) {
        existingDate.amount += spending;
      } else {
        totals.push({
          date: transaction.date,
          amount: spending,
        });
      }

      return totals;
    }, [])
    .sort((first, second) => first.date.localeCompare(second.date));

  if (spendingByDate.length === 0) {
    return <p>No spending data yet.</p>;
  }

  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={spendingByDate}
          margin={{
            top: 10,
            right: 10,
            left: 10,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="date" />

          <YAxis />

          <Tooltip formatter={(value) => formatMoney(value)} />

          <Line
            type="monotone"
            dataKey="amount"
            name="Spending"
            stroke="#2563eb"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SpendingOverTime;
