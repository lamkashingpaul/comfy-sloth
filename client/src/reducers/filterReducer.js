import {
  LOAD_PRODUCTS,
  SET_LIST_VIEW,
  SET_GRID_VIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS
} from '../actions'

const filterReducer = (state, action) => {
  const { type, payload } = action

  if (type === LOAD_PRODUCTS) {
    const { products } = payload
    const { filters } = state

    const maxPrice = Math.max(0, ...products.map((product) => product.price))
    const price = maxPrice

    return {
      ...state,
      products: [...products],
      filteredProducts: [...products],
      filters: {
        ...filters,
        maxPrice,
        price
      },
      initialFilter: {
        ...filters,
        maxPrice,
        price
      }
    }
  }

  if (type === SET_GRID_VIEW) {
    return {
      ...state,
      useGridView: true
    }
  }

  if (type === SET_LIST_VIEW) {
    return {
      ...state,
      useGridView: false
    }
  }

  if (type === UPDATE_SORT) {
    const { sort } = payload
    return {
      ...state,
      sort
    }
  }

  if (type === SORT_PRODUCTS) {
    const { sort, filteredProducts } = state
    let sortedFilteredProducts = [...filteredProducts]
    if (sort === 'price-lowest') {
      sortedFilteredProducts = sortedFilteredProducts.sort((a, b) => a.price - b.price)
    }
    if (sort === 'price-highest') {
      sortedFilteredProducts = sortedFilteredProducts.sort((a, b) => b.price - a.price)
    }
    if (sort === 'name-a') {
      sortedFilteredProducts = sortedFilteredProducts.sort((a, b) => a.name.localeCompare(b.name))
    }
    if (sort === 'name-z') {
      sortedFilteredProducts = sortedFilteredProducts.sort((a, b) => -a.name.localeCompare(b.name))
    }

    return {
      ...state,
      filteredProducts: sortedFilteredProducts
    }
  }

  if (type === UPDATE_FILTERS) {
    const { name, value } = payload
    return {
      ...state,
      filters: {
        ...state.filters,
        [name]: value
      }
    }
  }

  if (type === FILTER_PRODUCTS) {
    const { filters, products } = state
    const {
      text,
      category,
      company,
      color,
      price,
      freeShipping
    } = filters

    const updatedFilteredProducts = products
      .filter((product) => text === '' || product.name.match(new RegExp(text, 'i')))
      .filter((product) => category === 'all' || product.category === category)
      .filter((product) => company === 'all' || product.company === company)
      .filter((product) => color === 'all' || product.colors.includes(color))
      .filter((product) => product.price <= price)
      .filter((product) => !freeShipping || product.shipping === freeShipping)

    return {
      ...state,
      filteredProducts: updatedFilteredProducts
    }
  }

  if (type === CLEAR_FILTERS) {
    const { initialFilter } = state
    return {
      ...state,
      filters: { ...initialFilter }
    }
  }

  throw new Error(`No Matching "${type}" - action type`)
}

export default filterReducer
