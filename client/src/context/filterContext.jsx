import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/filterReducer'
import {
  LOAD_PRODUCTS,
  SET_GRID_VIEW,
  SET_LIST_VIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS
} from '../actions'
import { useProductsContext } from './productsContext'

const initialState = {
  products: [],
  filteredProducts: [],
  useGridView: true,
  sort: 'price-lowest',

  filters: {
    text: '',
    category: 'all',
    company: 'all',
    color: 'all',
    minPrice: 0,
    maxPrice: Number.MAX_VALUE,
    price: Number.MAX_VALUE,
    freeShipping: false
  },

  initialFilter: {}
}

const FilterContext = React.createContext()

export const FilterProvider = ({ children }) => {
  const { products } = useProductsContext()
  const [state, dispatch] = useReducer(reducer, initialState)

  const { sort, filters } = state

  const setGridView = () => {
    dispatch({ type: SET_GRID_VIEW })
  }

  const setListView = () => {
    dispatch({ type: SET_LIST_VIEW })
  }

  const updateFilters = (e) => {
    const name = e.target.name
    let value = e.target.value
    if (e.target.type === 'checkbox') {
      value = e.target.checked
    }
    if (name === 'price') {
      value = Number(value)
    }
    dispatch({ type: UPDATE_FILTERS, payload: { name, value } })
  }

  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS })
  }

  const updateSortBy = (e) => {
    const sort = e.target.value
    dispatch({ type: UPDATE_SORT, payload: { sort } })
  }

  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: { products } })
  }, [products])

  useEffect(() => {
    dispatch({ type: FILTER_PRODUCTS })
    dispatch({ type: SORT_PRODUCTS })
  }, [products, sort, filters])

  return (
    <FilterContext.Provider value={{
      ...state,
      setGridView,
      setListView,
      updateSortBy,
      updateFilters,
      clearFilters
    }}
    >
      {children}
    </FilterContext.Provider>
  )
}

export const useFilterContext = () => {
  return useContext(FilterContext)
}
