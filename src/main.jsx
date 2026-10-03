import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { FinanceProvider } from "./context/FinanceProvider.jsx";
import { CategoriesProvider } from "./context/CategoriesProvider.jsx";
import { BudgetProvider } from "./context/BudgetProvider.jsx";
import { ThemeProvider } from "./context/ThemeProvider.jsx";

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
