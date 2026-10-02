import TransactionForm from '../components/TransactionForm.jsx'
import TransactionList from '../components/TransactionList.jsx'

function Transactions() {
  return (
    <main>
      <header>
        <h1>Transactions</h1>
        <p>Manage your income and expenses</p>
      </header>

      <section>
        <h2>Add Transaction</h2>
        <TransactionForm />
      </section>

      <section>
        <h2>Your Transactions</h2>
        <TransactionList />
      </section>
    </main>
  )
}

export default Transactions