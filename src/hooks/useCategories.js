import { useContext } from 'react'
import { CategoriesContext } from '../context/CategoriesContext.jsx'

export function useCategories() {
  return useContext(CategoriesContext)
}
