import { Pencil, Trash2 } from "lucide-react";
import { useTransactions } from "../hooks/useTransactions.js";
import { formatMoney } from "../utils/formatMoney.js";

function TransactionList({ transactions, onEdit }) {
  const { deleteTransaction } = useTransactions();

  function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this transaction?",
    );

    if (confirmed) {
      deleteTransaction(id);
    }
  }

  return (
    <div className="transaction-list">
      {transactions.map((transaction) => {
        const isIncome = transaction.amount > 0;

        return (
          <article
            className={`transaction-item ${isIncome ? "income" : "expense"}`}
            key={transaction.id}
          >
            <div className="transaction-details">
              <h3>{transaction.description}</h3>

              <p>{transaction.category}</p>

              <p>{transaction.date}</p>

              {transaction.note && <p>{transaction.note}</p>}
            </div>

            <div className="transaction-actions">
              <p
                className={`transaction-amount ${
                  isIncome ? "income" : "expense"
                }`}
              >
                {isIncome ? "+" : ""}
                {formatMoney(transaction.amount)}
              </p>

              <button
                type="button"
                className="icon-button"
                onClick={() => onEdit(transaction)}
                aria-label={`Edit ${transaction.description}`}
                title="Edit transaction"
              >
                <Pencil size={18} />
              </button>

              <button
                type="button"
                className="icon-button delete-button"
                onClick={() => handleDelete(transaction.id)}
                aria-label={`Delete ${transaction.description}`}
                title="Delete transaction"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default TransactionList;
