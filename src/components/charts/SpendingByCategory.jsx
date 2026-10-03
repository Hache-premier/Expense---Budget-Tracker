import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useTransactions } from "../../hooks/useTransactions.js";
import { useCategories } from "../../hooks/useCategories.js";
import { formatMoney } from "../../utils/formatMoney.js";

function SpendingByCategory() {
  const { transactions } = useTransactions();
  const { categories } = useCategories();

  const spendingByCategory = categories
    .map((category) => {
      const amount = transactions
        .filter(
          (transaction) =>
            transaction.amount < 0 && transaction.category === category.name,
        )
        .reduce(
          (total, transaction) => total + Math.abs(transaction.amount),
          0,
        );

      return {
        name: category.name,
        value: amount,
        color: category.color,
      };
    })
    .filter((category) => category.value > 0);

  if (spendingByCategory.length === 0) {
    return <p>No spending data yet.</p>;
  }

  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={spendingByCategory}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius="70%"
            label
          >
            {spendingByCategory.map((category) => (
              <Cell key={category.name} fill={category.color} />
            ))}
          </Pie>

          <Tooltip formatter={(value) => formatMoney(value)} />

          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SpendingByCategory;
