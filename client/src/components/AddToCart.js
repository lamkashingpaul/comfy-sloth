import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FaCheck } from 'react-icons/fa'
import { useCartContext } from '../context/cartContext'
import AmountButtons from './AmountButtons'

const AddToCart = ({ product }) => {
  const { addToCart } = useCartContext()
  const { id, stock, colors } = product

  const [amount, setAmount] = useState(1)
  const [selectedColorIndex, setSelectedColorIndex] = useState(0)

  const addToAmount = (delta) => {
    setAmount(oldAmount => Math.min(Math.max(1, oldAmount + delta), stock))
  }

  return <Wrapper>
    <div className="colors">
      <span>colors: </span>
      <div className="">
        {colors.map((color, i) => {
          return <button
            key={i}
            style={{ background: color }}
            className={`color-btn ${selectedColorIndex === i && 'active'}`}
            onClick={() => setSelectedColorIndex(i)}
          >
            {selectedColorIndex === i && <FaCheck /> }
          </button>
        })}
      </div>
    </div>
    <AmountButtons amount={amount} addToAmount={addToAmount} />
    <Link
      to="/cart"
      className="btn"
      onClick={() => addToCart(id, colors[selectedColorIndex], amount, product)}
    >add to cart</Link>
  </Wrapper>
}

const Wrapper = styled.section`
  margin-top: 2rem;
  .colors {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    span {
      text-transform: capitalize;
      font-weight: 700;
    }
    div {
      display: flex;
    }
  }
  .color-btn {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.75rem;
      color: var(--clr-white);
    }
  }
  .active {
    opacity: 1;
  }
  .btn-container {
    margin-top: 2rem;
  }

  .btn {
    margin-top: 1rem;
    width: 140px;
  }
`

export default AddToCart
