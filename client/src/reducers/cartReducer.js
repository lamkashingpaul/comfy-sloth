import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT
} from '../actions'

const cartReducer = (state, action) => {
  const { type, payload } = action

  if (type === ADD_TO_CART) {
    const { id, color, amount, product } = payload
    const { name, images, price, stock } = product
    const item = state.cart.find(item => item.id === `${id}${color}`)

    if (item) {
      const tempCart = state.cart.map((item) => {
        if (item.id === `${id}${color}`) {
          item.amount = Math.min(item.amount + amount, item.max)
        }
        return item
      })

      return {
        ...state,
        cart: tempCart
      }
    } else {
      const newItem = {
        id: `${id}${color}`,
        name,
        color,
        amount,
        image: images[0].url,
        price,
        max: stock
      }
      return {
        ...state,
        cart: [...state.cart, newItem]
      }
    }
  }

  if (type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, delta } = payload
    const tempCart = state.cart.map((item) => {
      if (item.id === id) {
        item.amount = Math.min(Math.max(1, item.amount + delta), item.max)
      }
      return item
    })

    return {
      ...state,
      cart: tempCart
    }
  }

  if (type === COUNT_CART_TOTALS) {
    const { totalItems, totalAmount } = state.cart.reduce((acc, cur) => {
      return {
        totalItems: acc.totalItems + cur.amount,
        totalAmount: acc.totalAmount + cur.amount * cur.price
      }
    }, { totalItems: 0, totalAmount: 0 })

    return {
      ...state,
      totalItems,
      totalAmount
    }
  }

  if (type === REMOVE_CART_ITEM) {
    const { id } = payload
    return {
      ...state,
      cart: state.cart.filter((item) => item.id !== id)
    }
  }

  if (type === CLEAR_CART) {
    return {
      ...state,
      cart: []
    }
  }

  throw new Error(`No Matching "${action.type}" - action type`)
}

export default cartReducer
