import { useState } from 'react';
import TransactionForm from '../components/TransactionForm.jsx';
import TransactionList from '../components/TransactionList.jsx';
import { useCategories } from '../hooks/useCategories.js';
import { useTransactions } from '../hooks/useTransactions.js';
import { useDebouncedValue } from '../hooks/useDebouncedValue.js';

function Transactions() {
  const { transactions } = useTransactions();
  const { categories } = useCategories();

  const [transactionToEdit, setTransactionToEdit] = useState(null);
  const [month, setMonth] = useState('');
  const [type, setType] = useState('all');
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');

  const debouncedSearch = useDebouncedValue(search, 300);

  function handleEdit(transaction) {
    setTransactionToEdit(transaction);
  }

  function finishEditing() {
    setTransactionToEdit(null);
  }

  const filteredTransactions = [...transactions]
    .filter((transaction) => {
      const matchesMonth =
        !month || transaction.date.startsWith(month);

      const matchesType =
        type === 'all' ||
        (type === 'income' && transaction.amount > 0) ||
        (type === 'expense' && transaction.amount < 0);

      const matchesCategory =
        !category || transaction.category === category;

      const matchesSearch =
        !debouncedSearch ||
        (transaction.note || '')
          .toLowerCase()
          .includes(debouncedSearch.toLowerCase());

      return (
        matchesMonth &&
        matchesType &&
        matchesCategory &&
        matchesSearch
      );
    })
    .sort((first, second) =>
      second.date.localeCompare(first.date),
    );

  return (
    <main>
      <header>
        <h1>Transactions</h1>
        <p>Manage your income and expenses</p>
      </header>

      <section>
        <h2>
          {transactionToEdit ? 'Edit Transaction' : 'Add Transaction'}
        </h2>

        <TransactionForm
          key={transactionToEdit?.id ?? 'new'}
          transactionToEdit={transactionToEdit}
          onFinishEditing={finishEditing}
        />
      </section>

      <section>
        <h2>Filter Transactions</h2>

        <div>
          <div>
            <label htmlFor="transaction-month">Month</label>

            <input
              id="transaction-month"
              type="month"
              value={month}
              onChange={(event) => setMonth(event.target.value)}
            />
          </div>

          <div>
            <label htmlFor="transaction-type">Type</label>

            <select
              id="transaction-type"
              value={type}
              onChange={(event) => setType(event.target.value)}
            >
              <option value="all">All</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div>
            <label htmlFor="transaction-category">Category</label>

            <select
              id="transaction-category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option value="">All Categories</option>

              {categories.map((categoryOption) => (
                <option
                  key={categoryOption.id}
                  value={categoryOption.name}
                >
                  {categoryOption.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="transaction-search">Search Notes</label>

            <input
              id="transaction-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search notes..."
            />
          </div>

          <button
            type="button"
            onClick={() => {
              setMonth('');
              setType('all');
              setCategory('');
              setSearch('');
            }}
          >
            Clear Filters
          </button>
        </div>
      </section>

      <section>
        <h2>Your Transactions</h2>

        {filteredTransactions.length === 0 ? (
          <p>No transactions match your filters.</p>
        ) : (
          <TransactionList
            transactions={filteredTransactions}
            onEdit={handleEdit}
          />
        )}
      </section>
    </main>
  );
}

export default Transactions;
