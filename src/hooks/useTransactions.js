import { useContext } from 'react'
import { FinanceContext } from '../context/FinanceContext.jsx'

export function useTransactions() {
  const { transactions, setTransactions } = useContext(FinanceContext)

  function addTransaction(transaction) {
    setTransactions((currentTransactions) => [
      transaction,
      ...currentTransactions,
    ])
  }

  function updateTransaction(updatedTransaction) {
    setTransactions((currentTransactions) =>
      currentTransactions.map((transaction) =>
        transaction.id === updatedTransaction.id
          ? updatedTransaction
          : transaction,
      ),
    )
  }

  function deleteTransaction(id) {
    setTransactions((currentTransactions) =>
      currentTransactions.filter((transaction) => transaction.id !== id),
    )
  }

  const totalIncome = transactions
    .filter((transaction) => transaction.amount > 0)
    .reduce((total, transaction) => total + transaction.amount, 0)

  const totalExpenses = transactions
    .filter((transaction) => transaction.amount < 0)
    .reduce((total, transaction) => total + Math.abs(transaction.amount), 0)

  const balance = totalIncome - totalExpenses

  return {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    totalIncome,
    totalExpenses,
    balance,
  }
}
