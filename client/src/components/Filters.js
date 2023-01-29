import React from 'react'
import styled from 'styled-components'
import { useFilterContext } from '../context/filterContext'
import { getUniqueValues, formatPrice } from '../utils/helpers'
import { FaCheck } from 'react-icons/fa'

const Filters = () => {
  const { products, filters, updateFilters, clearFilters } = useFilterContext()

  const categories = getUniqueValues(products, 'category')
  const companies = getUniqueValues(products, 'company')
  const colors = getUniqueValues(products, 'colors')

  return <Wrapper>
    <div className="content">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-control">
          <input
            className="search-input"
            type="text"
            name="text"
            id="text"
            placeholder="search"
            value={filters.text}
            onChange={updateFilters}
          />
        </div>
        <div className="form-control">
          <h5>category</h5>
          <div className="category">
            {categories.map((category, i) => {
              return <button
                key={i}
                type="button"
                name="category"
                value={category}
                className={category === filters.category ? 'active' : null}
                onClick={updateFilters}
              >{category}</button>
            })}
          </div>
        </div>
        <div className="form-control">
          <h5>company</h5>
          <select
            className="company"
            name="company"
            id="company"
            value={filters.company}
            onChange={updateFilters}
          >
            {companies.map((company, i) => {
              return <option key={i} value={company}>{company}</option>
            })}
          </select>
        </div>
        <div className="form-control">
          <h5>colors</h5>
          <div className="colors">
            {colors.map((color, i) => {
              return <button
                className={`${color === 'all' ? 'all' : 'color'}-btn ${color === filters.color ? 'active' : null}`}
                style={{ background: `${color !== 'all' ? color : null}` }}
                key={i}
                type="button"
                name="color"
                value={color}
                onClick={updateFilters}
              >{color === 'all' ? 'all' : color === filters.color ? <FaCheck /> : null}</button>
            })}
          </div>
        </div>
        <div className="form-control">
          <h5>price</h5>
          <p className="price">{formatPrice(filters.price)}</p>
          <input
            type="range"
            name="price"
            id="price"
            min={filters.minPrice}
            max={filters.maxPrice}
            value={filters.price}
            onChange={updateFilters}
          />
        </div>
        <div className="form-control shipping">
          <label htmlFor="freeShipping">free shipping</label>
          <input
            type="checkbox"
            name="freeShipping"
            id="freeShipping"
            checked={filters.freeShipping}
            onChange={updateFilters}
          />
        </div>
      </form>
      <button
        type="button"
        className="clear-btn"
        onClick={clearFilters}
      >clear filter</button>
    </div>
  </Wrapper>
}

const Wrapper = styled.section`
  form {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .content {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }

  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }

  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }

  .active {
    border-color: var(--clr-grey-5);
  }

  .category {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }

  .colors {
    display: flex;
    align-items: center;
  }

  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
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
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }

  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
    max-width: 200px;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }

  @media (min-width: 768px) {
    form {
      display: block;
    }

    .content {
      display: block;
      position: sticky;
      top: 1rem;
    }

    .category {
      display: block;
    }
  }
`

export default Filters
