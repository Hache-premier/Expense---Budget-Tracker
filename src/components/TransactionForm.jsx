import { useEffect, useState } from 'react'
import { useTransactions } from '../hooks/useTransactions.js'
import { useCategories } from '../hooks/useCategories.js'

function TransactionForm({ transactionToEdit, onFinishEditing }) {
  const { addTransaction, updateTransaction } = useTransactions()
  const { categories } = useCategories()

  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('')
  const [date, setDate] = useState('')
  const [note, setNote] = useState('')

  useEffect(() => {
    if (transactionToEdit) {
      setDescription(transactionToEdit.description)
      setAmount(String(transactionToEdit.amount))
      setCategory(transactionToEdit.category)
      setDate(transactionToEdit.date)
      setNote(transactionToEdit.note)
    } else {
      resetForm()
    }
  }, [transactionToEdit])

  function resetForm() {
    setDescription('')
    setAmount('')
    setCategory('')
    setDate('')
    setNote('')
  }

  function handleSubmit(event) {
    event.preventDefault()

    const transaction = {
      id: transactionToEdit ? transactionToEdit.id : crypto.randomUUID(),
      description,
      amount: Number(amount),
      category,
      date,
      note,
    }

    if (transactionToEdit) {
      updateTransaction(transaction)
      onFinishEditing()
    } else {
      addTransaction(transaction)
    }

    resetForm()
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="description">Description</label>

        <input
          id="description"
          type="text"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="e.g. Salary"
          required
        />
      </div>

      <div>
        <label htmlFor="amount">Amount</label>

        <input
          id="amount"
          type="number"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          placeholder="e.g. 500000 or -25000"
          required
        />
      </div>

      <div>
        <label htmlFor="category">Category</label>

        <select
          id="category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          required
        >
          <option value="">Select a category</option>

          {categories.map((categoryOption) => (
            <option key={categoryOption.id} value={categoryOption.name}>
              {categoryOption.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="date">Date</label>

        <input
          id="date"
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="note">Note</label>

        <textarea
          id="note"
          value={note}
          onChange={(event) => setNote(event.target.value)}
          placeholder="Optional note"
        />
      </div>

      <button type="submit">
        {transactionToEdit ? 'Update Transaction' : 'Add Transaction'}
      </button>

      {transactionToEdit && (
        <button type="button" onClick={onFinishEditing}>
          Cancel
        </button>
      )}
    </form>
  )
}

export default TransactionForm