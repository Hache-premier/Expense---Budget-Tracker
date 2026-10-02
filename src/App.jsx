import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppLayout from './components/AppLayout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Transactions from './pages/Transactions.jsx'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/transactions" element={<Transactions/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App 