import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Expense & Budget Tracker</h1>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App 