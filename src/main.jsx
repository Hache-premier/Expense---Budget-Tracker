import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { FinanceProvider } from "./context/FinanceContext.jsx";
import { CategoriesProvider } from "./context/CategoriesContext.jsx";
import { BudgetProvider } from "./context/BudgetContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <CategoriesProvider>
        <BudgetProvider>
          <FinanceProvider>
            <App />
          </FinanceProvider>
        </BudgetProvider>
      </CategoriesProvider>
    </ThemeProvider>
  </StrictMode>,
);
