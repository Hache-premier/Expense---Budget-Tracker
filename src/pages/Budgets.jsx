import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { useBudgets } from '../hooks/useBudgets.js';
import { useCategories } from '../hooks/useCategories.js';
import { useTransactions } from '../hooks/useTransactions.js';
import { formatMoney } from '../utils/formatMoney.js';
import CategoryOptions from '../components/CategoryOptions.jsx';

function Budgets() {
  const { budgets, addBudget, updateBudget, deleteBudget } = useBudgets();
  const { categories } = useCategories();
  const { transactions } = useTransactions();

  const [category, setCategory] = useState('');
  const [month, setMonth] = useState('');
  const [amount, setAmount] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    if (!category || !month || Number(amount) <= 0) {
      return;
    }

    const existingBudget = budgets.find(
      (budget) =>
        budget.category === category && budget.month === month,
    );

    if (existingBudget) {
      updateBudget({
        ...existingBudget,
        amount: Number(amount),
      });
    } else {
      const budget = {
        id: crypto.randomUUID(),
        category,
        month,
        amount: Number(amount),
      };

      addBudget(budget);
    }

    setCategory('');
    setMonth('');
    setAmount('');
  }

  function getSpentAmount(budget) {
    return transactions
      .filter(
        (transaction) =>
          transaction.amount < 0 &&
          transaction.category === budget.category &&
          transaction.date.startsWith(budget.month),
      )
      .reduce(
        (total, transaction) => total + Math.abs(transaction.amount),
        0,
      );
  }

  function handleDelete(id) {
    const confirmed = window.confirm(
      'Are you sure you want to delete this budget?',
    );

    if (confirmed) {
      deleteBudget(id);
    }
  }

  return (
    <main className="budgets-page">
      <header>
        <h1>Budgets</h1>
        <p>Set and manage your monthly category budgets</p>
      </header>

      <section className="budget-form-section">
        <h2>Add Budget</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="budget-category">Category</label>

            <select
              id="budget-category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              required
            >
              <option value="">Select a category</option>
              <CategoryOptions categories={categories} />
            </select>
          </div>

          <div>
            <label htmlFor="budget-month">Month</label>

            <input
              id="budget-month"
              type="month"
              value={month}
              onChange={(event) => setMonth(event.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="budget-amount">Budget Amount</label>

            <input
              id="budget-amount"
              type="number"
              min="1"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              placeholder="e.g. 100000"
              required
            />
          </div>

          <button type="submit">Add Budget</button>
        </form>
      </section>

      <section className="budgets-section">
        <h2>Your Budgets</h2>

        {budgets.length === 0 ? (
          <p className="empty-state">
            No budgets yet. Add your first monthly budget above.
          </p>
        ) : (
          <div className="budget-grid">
            {budgets.map((budget) => {
              const spent = getSpentAmount(budget);
              const percentage =
                budget.amount > 0
                  ? (spent / budget.amount) * 100
                  : 0;
              const progress = Math.min(percentage, 100);
              const remaining = budget.amount - spent;
              const isOverBudget = spent > budget.amount;
              const isNearLimit =
                !isOverBudget && percentage >= 80;

              return (
                <article
                  className={`budget-card ${
                    isOverBudget
                      ? 'over-budget'
                      : isNearLimit
                        ? 'near-limit'
                        : ''
                  }`}
                  key={budget.id}
                >
                  <div className="budget-card-header">
                    <div>
                      <h3>{budget.category}</h3>
                      <p>{budget.month}</p>
                    </div>

                    <button
                      type="button"
                      className="icon-button delete-button"
                      onClick={() => handleDelete(budget.id)}
                      aria-label={`Delete ${budget.category} budget`}
                      title="Delete budget"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="budget-amounts">
                    <div>
                      <span>Budget</span>
                      <strong>{formatMoney(budget.amount)}</strong>
                    </div>

                    <div>
                      <span>Spent</span>
                      <strong>{formatMoney(spent)}</strong>
                    </div>
                  </div>

                  <div
                    className="budget-progress"
                    role="progressbar"
                    aria-valuenow={Math.min(percentage, 100)}
                    aria-valuemin="0"
                    aria-valuemax="100"
                    aria-label={`${budget.category} budget progress`}
                  >
                    <div
                      className="budget-progress-bar"
                      style={{
                        width: `${progress}%`,
                      }}
                    />
                  </div>

                  <div className="budget-status">
                    <strong>{Math.round(percentage)}% used</strong>

                    {isOverBudget ? (
                      <span className="budget-warning">
                        Over budget by{' '}
                        {formatMoney(spent - budget.amount)}
                      </span>
                    ) : isNearLimit ? (
                      <span className="budget-warning">
                        Approaching budget limit
                      </span>
                    ) : (
                      <span>
                        {formatMoney(remaining)} remaining
                      </span>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}

export default Budgets;
