import { Link, Outlet } from 'react-router-dom'

function AppLayout() {
  return (
    <div className="app-layout">
      <aside className="sidebar">
        <h1>Expense Tracker</h1>

        <nav>
          <Link to="/">Dashboard</Link>
          <Link to="/transactions">Transactions</Link>
          <Link to="/budgets">Budgets</Link>
          <Link to="/categories">Categories</Link>
        </nav>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  )
}

export default AppLayout