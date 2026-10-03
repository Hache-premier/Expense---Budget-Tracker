import { NavLink, Outlet } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../hooks/useTheme.js";

function AppLayout() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <h1>Expense Tracker</h1>

        <nav>
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/transactions"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Transactions
          </NavLink>

          <NavLink
            to="/budgets"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Budgets
          </NavLink>

          <NavLink
            to="/categories"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Categories
          </NavLink>
        </nav>

        <button type="button" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
      </aside>

      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
