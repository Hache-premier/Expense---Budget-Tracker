import { useState } from 'react';
import { useTransactions } from '../hooks/useTransactions.js';
import { useCategories } from '../hooks/useCategories.js';

function TransactionForm({ transactionToEdit, onFinishEditing }) {
  const { addTransaction, updateTransaction } = useTransactions();
  const { categories } = useCategories();

  const [description, setDescription] = useState(
    transactionToEdit?.description ?? '',
  );
  const [amount, setAmount] = useState(
    transactionToEdit ? String(transactionToEdit.amount) : '',
  );
  const [category, setCategory] = useState(
    transactionToEdit?.category ?? '',
  );
  const [date, setDate] = useState(transactionToEdit?.date ?? '');
  const [note, setNote] = useState(transactionToEdit?.note ?? '');
  const [error, setError] = useState('');

  function resetForm() {
    setDescription('');
    setAmount('');
    setCategory('');
    setDate('');
    setNote('');
    setError('');
  }

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedDescription = description.trim();
    const numericAmount = Number(amount);

    if (!trimmedDescription) {
      setError('Please enter a description.');
      return;
    }

    if (!amount || !Number.isFinite(numericAmount)) {
      setError('Please enter a valid amount.');
      return;
    }

    if (numericAmount === 0) {
      setError('The amount cannot be zero.');
      return;
    }

    if (!category) {
      setError('Please select a category.');
      return;
    }

    if (!date) {
      setError('Please select a date.');
      return;
    }

    const transaction = {
      id: transactionToEdit ? transactionToEdit.id : crypto.randomUUID(),
      description: trimmedDescription,
      amount: numericAmount,
      category,
      date,
      note: note.trim(),
    };

    if (transactionToEdit) {
      updateTransaction(transaction);
      onFinishEditing();
    } else {
      addTransaction(transaction);
    }

    resetForm();
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="description">Description</label>

        <input
          id="description"
          type="text"
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
            setError('');
          }}
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
          onChange={(event) => {
            setAmount(event.target.value);
            setError('');
          }}
          placeholder="e.g. 500000 or -25000"
          required
        />

        <small>
          Use a positive amount for income and a negative amount for
          expenses.
        </small>
      </div>

      <div>
        <label htmlFor="category">Category</label>

        <select
          id="category"
          value={category}
          onChange={(event) => {
            setCategory(event.target.value);
            setError('');
          }}
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
          onChange={(event) => {
            setDate(event.target.value);
            setError('');
          }}
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

      {error && <p className="form-error">{error}</p>}

      <button type="submit">
        {transactionToEdit ? 'Update Transaction' : 'Add Transaction'}
      </button>

      {transactionToEdit && (
        <button type="button" onClick={onFinishEditing}>
          Cancel
        </button>
      )}
    </form>
  );
}

export default TransactionForm;