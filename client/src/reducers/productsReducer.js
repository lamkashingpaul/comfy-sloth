import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR
} from '../actions'

const productsReducer = (state, action) => {
  const { type, payload } = action

  if (type === SIDEBAR_OPEN) {
    return { ...state, isSidebarOpen: true }
  }

  if (type === SIDEBAR_CLOSE) {
    return { ...state, isSidebarOpen: false }
  }

  if (type === GET_PRODUCTS_BEGIN) {
    return { ...state, productsLoading: true, productsError: false }
  }

  if (type === GET_PRODUCTS_SUCCESS) {
    const { products, featuredProducts } = payload
    return {
      ...state,
      productsLoading: false,
      products,
      featuredProducts
    }
  }

  if (type === GET_PRODUCTS_ERROR) {
    return {
      ...state,
      productsLoading: false,
      products: [],
      featuredProducts: [],
      productsError: true
    }
  }

  if (type === GET_SINGLE_PRODUCT_BEGIN) {
    return {
      ...state,
      singleProductsLoading: true,
      singleProductsError: false,
      singleProduct: {}
    }
  }

  if (type === GET_SINGLE_PRODUCT_SUCCESS) {
    return {
      ...state,
      singleProductsLoading: false,
      singleProduct: payload.singleProduct
    }
  }

  if (type === GET_SINGLE_PRODUCT_ERROR) {
    return {
      ...state,
      singleProductsLoading: false,
      singleProductsError: true,
      singleProduct: {}
    }
  }

  throw new Error(`No Matching "${type}" - action type`)
}

export default productsReducer
