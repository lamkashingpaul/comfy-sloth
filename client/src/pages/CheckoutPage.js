import React from 'react'
import styled from 'styled-components'
import { PageHero, StripeCheckout } from '../components'
import { useCartContext } from '../context/cartContext'
import { Link } from 'react-router-dom'

const CheckoutPage = () => {
  const { cart } = useCartContext()

  if (!cart || cart.length === 0) {
    return <EmptyCartWrapper className="page-100">
      <div className="empty">
        <h2>Your cart is empty</h2>
        <Link to="/products" className="btn">fill it</Link>
      </div>
    </EmptyCartWrapper>
  }

  return <main>
    <PageHero title="checkout" />
    <Wrapper className="page">
      <StripeCheckout />
    </Wrapper>
  </main>
}

const EmptyCartWrapper = styled.main`
  .empty {
    text-align: center;
    h2 {
      margin-bottom: 1rem;
      text-transform: none;
    }
  }
`

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .empty {
    text-align: center;
  }
`

export default CheckoutPage
