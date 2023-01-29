import React from 'react'
import styled from 'styled-components'
import { FaPlus, FaMinus } from 'react-icons/fa'

const AmountButtons = ({ amount, addToAmount }) => {
  return <Wrapper className="btn-container">
    <button onClick={() => addToAmount(-1)}><FaMinus /></button>
    <h2>{amount}</h2>
    <button onClick={() => addToAmount(1)}><FaPlus /></button>
  </Wrapper>
}

const Wrapper = styled.div`
  display: grid;
  width: 140px;
  justify-items: center;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  h2 {
    margin-bottom: 0;
  }
  button {
    background: transparent;
    border-color: transparent;
    cursor: pointer;
    padding: 1rem 0;
    width: 2rem;
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

export default AmountButtons
