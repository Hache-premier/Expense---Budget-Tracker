import { useContext } from 'react'
import { BudgetContext } from '../context/BudgetContext.jsx'

export function useBudgets() {
  return useContext(BudgetContext)
}