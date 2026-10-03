import { useLocalStorage } from "../hooks/useLocalStorage.js";
import { FinanceContext } from "./FinanceContext.jsx";

export function FinanceProvider({ children }) {
  const [transactions, setTransactions] = useLocalStorage(
    "expense-tracker-transactions",
    [],
  );

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        setTransactions,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
}
