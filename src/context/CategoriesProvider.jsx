import { useLocalStorage } from "../hooks/useLocalStorage.js";
import { CategoriesContext } from "./CategoriesContext.jsx";

const defaultCategories = [
  { id: "salary", name: "Salary", color: "#2563eb" },
  { id: "food", name: "Food", color: "#16a34a" },
  { id: "transport", name: "Transport", color: "#f59e0b" },
  { id: "housing", name: "Housing", color: "#dc2626" },
  { id: "health", name: "Health", color: "#9333ea" },
  { id: "education", name: "Education", color: "#0891b2" },
  { id: "shopping", name: "Shopping", color: "#db2777" },
  { id: "entertainment", name: "Entertainment", color: "#7c3aed" },
  { id: "other", name: "Other", color: "#64748b" },
];

export function CategoriesProvider({ children }) {
  const [categories, setCategories] = useLocalStorage(
    "expense-tracker-categories",
    defaultCategories,
  );

  function addCategory(category) {
    setCategories((currentCategories) => [...currentCategories, category]);
  }

  function deleteCategory(id) {
    setCategories((currentCategories) =>
      currentCategories.filter((category) => category.id !== id),
    );
  }

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        addCategory,
        deleteCategory,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
}
