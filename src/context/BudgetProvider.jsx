import { useLocalStorage } from "../hooks/useLocalStorage.js";
import { BudgetContext } from "./BudgetContext.jsx";

export function BudgetProvider({ children }) {
  const [budgets, setBudgets] = useLocalStorage("expense-tracker-budgets", []);

  function addBudget(budget) {
    setBudgets((currentBudgets) => [...currentBudgets, budget]);
  }

  function updateBudget(updatedBudget) {
    setBudgets((currentBudgets) =>
      currentBudgets.map((budget) =>
        budget.id === updatedBudget.id ? updatedBudget : budget,
      ),
    );
  }

  function deleteBudget(id) {
    setBudgets((currentBudgets) =>
      currentBudgets.filter((budget) => budget.id !== id),
    );
  }

  return (
    <BudgetContext.Provider
      value={{
        budgets,
        addBudget,
        updateBudget,
        deleteBudget,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
}
