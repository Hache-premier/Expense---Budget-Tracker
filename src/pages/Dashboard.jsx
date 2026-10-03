import { useTransactions } from "../hooks/useTransactions.js";
import { formatMoney } from "../utils/formatMoney.js";
import SpendingByCategory from "../components/charts/SpendingByCategory.jsx";
import SpendingOverTime from "../components/charts/SpendingOverTime.jsx";

function Dashboard() {
  const { transactions, totalIncome, totalExpenses, balance } =
    useTransactions();

  const recentTransactions = transactions.slice(0, 5);

  return (
    <main className="dashboard">
      <header>
        <h1>Dashboard</h1>
        <p>Overview of your finances</p>
      </header>

      <section className="summary-grid">
        <article className="summary-card">
          <h2>Total Balance</h2>
          <p>{formatMoney(balance)}</p>
        </article>

        <article className="summary-card">
          <h2>Total Income</h2>
          <p>{formatMoney(totalIncome)}</p>
        </article>

        <article className="summary-card">
          <h2>Total Expenses</h2>
          <p>{formatMoney(totalExpenses)}</p>
        </article>
      </section>

      <section className="dashboard-grid">
        <div className="dashboard-card recent-transactions">
          <h2>Recent Transactions</h2>

          {recentTransactions.length === 0 ? (
            <p>No transactions yet.</p>
          ) : (
            <div className="recent-transaction-list">
              {recentTransactions.map((transaction) => (
                <article className="recent-transaction" key={transaction.id}>
                  <div>
                    <h3>{transaction.description}</h3>
                    <p>{transaction.category}</p>
                    <p>{transaction.date}</p>
                  </div>

                  <p
                    className={
                      transaction.amount > 0
                        ? "transaction-amount income"
                        : "transaction-amount expense"
                    }
                  >
                    {transaction.amount > 0 ? "+" : ""}
                    {formatMoney(transaction.amount)}
                  </p>
                </article>
              ))}
            </div>
          )}
        </div>

        <div className="dashboard-card">
          <h2>Spending by Category</h2>
          <SpendingByCategory />
        </div>

        <div className="dashboard-card">
          <h2>Spending Over Time</h2>
          <SpendingOverTime />
        </div>
      </section>
    </main>
  );
}

export default Dashboard;
