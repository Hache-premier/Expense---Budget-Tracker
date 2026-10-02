import { createContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage.js'

export const FinanceContext = createContext()

export function FinanceProvider({ children }) {
  const [transactions, setTransactions] = useLocalStorage(
    'expense-tracker-transactions',
    [],
  )

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        setTransactions,
      }}
    >
      {children}
    </FinanceContext.Provider>
  )
}