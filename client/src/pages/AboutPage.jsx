import React from 'react'
import styled from 'styled-components'
import { PageHero } from '../components'
import aboutImg from '../assets/hero-bcg.jpeg'

const AboutPage = () => {
  return <main>
    <PageHero title="about" />
    <div className="page">
      <Wrapper className="section section-center">
        <img src={aboutImg} alt="nice desk" />
        <article>
          <div className="title">
            <h2>our story</h2>
            <div className="underline"></div>
          </div>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, perferendis veritatis quod vitae odit nobis laboriosam adipisci, enim, reprehenderit magnam nostrum similique modi! Atque nobis consectetur hic reprehenderit? Aliquid ad reprehenderit nisi velit hic placeat et doloribus labore! Suscipit tempora culpa unde quasi? Neque saepe dolorum, accusamus asperiores odio exercitationem?</p>
        </article>
      </Wrapper>
    </div>
  </main>
}

const Wrapper = styled.section`
  display: grid;
  gap: 4rem;
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`

export default AboutPage
