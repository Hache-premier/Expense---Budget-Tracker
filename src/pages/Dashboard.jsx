import { useTransactions } from '../hooks/useTransactions.js'
import { formatMoney } from '../utils/formatMoney.js'

function Dashboard() {
  const { transactions, totalIncome, totalExpenses, balance } =
    useTransactions()

  return (
    <main>
      <header>
        <h1>Dashboard</h1>
        <p>Overview of your finances</p>
      </header>

      <section>
        <article>
          <h2>Total Balance</h2>
          <p>{formatMoney(balance)}</p>
        </article>

        <article>
          <h2>Total Income</h2>
          <p>{formatMoney(totalIncome)}</p>
        </article>

        <article>
          <h2>Total Expenses</h2>
          <p>{formatMoney(totalExpenses)}</p>
        </article>
      </section>

      <section>
        <div>
          <h2>Recent Transactions</h2>
          <p>
            {transactions.length === 0
              ? 'No transactions yet.'
              : `${transactions.length} transactions`}
          </p>
        </div>

        <div>
          <h2>Spending Overview</h2>
          <p>No spending data yet.</p>
        </div>
      </section>
    </main>
  )
}

export default Dashboard