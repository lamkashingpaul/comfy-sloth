import React from 'react'
import styled from 'styled-components'
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs'

const thresholds = [0, 0.25, 0.75]
const starIcons = [BsStar, BsStarHalf, BsStarFill]

const bisectRight = (v) => {
  let l = 0
  let r = thresholds.length
  while (l < r) {
    const m = (l + r) / 2 | 0
    if (thresholds[m] <= v) {
      l = m + 1
    } else {
      r = m
    }
  }
  return l
}

const Stars = ({ reviews, stars }) => {
  const filledStars = Array.from({ length: stars | 0 }).map(() => BsStarFill)
  const remainingStars = stars - filledStars.length
  const lastStarIndex = bisectRight(remainingStars) - 1

  if (lastStarIndex >= 0) {
    filledStars.push(starIcons[lastStarIndex])
  }

  const totalStars = filledStars.concat(Array.from({ length: 5 - filledStars.length }).map(() => BsStar))

  return <Wrapper>
    <div className="stars">
      {totalStars.map((Star, i) => <span key={i}><Star /></span>)}
    </div>
    <p className="reviews">({reviews} customer reviews)</p>
  </Wrapper>
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  span {
    color: #ffb900;
    font-size: 1rem;
    margin-right: 0.25rem;
  }
  p {
    margin-left: 0.5rem;
    margin-bottom: 0;
  }
  margin-bottom: 0.5rem;
`
export default Stars
