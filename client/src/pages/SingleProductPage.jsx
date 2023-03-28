import React, { useEffect, useMemo } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useProductsContext } from '../context/productsContext'
import { singleProductUrl as url } from '../utils/constants'
import { formatPrice } from '../utils/helpers'
import { Loading, Error, ProductImages, AddToCart, Stars, PageHero } from '../components'
import styled from 'styled-components'

const SingleProductPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { setSingleProductLoading, singleProductsLoading, singleProductsError, singleProduct, fetchSingleProduct } = useProductsContext()

  useMemo(() => {
    setSingleProductLoading()
  }, [id])

  useEffect(() => {
    fetchSingleProduct(`${url}${id}`)
  }, [id])

  useEffect(() => {
    if (singleProductsError) {
      setTimeout(() => navigate('/'), 3000)
    }
  }, [singleProductsError])

  if (singleProductsLoading) {
    return <div className="page-100">
      <Loading />
    </div>
  }

  if (singleProductsError) {
    return <div className="page-100">
      <Error />
    </div>
  }

  const { name, price, description, stock, stars, reviews, id: sku, company, images } = singleProduct

  return <Wrapper>
    <PageHero
      directories={[{ name: 'products', url: '/products' }]}
      title={name}
    />
    <div className="section section-center page">
      <Link to="/products" className="btn">back to products</Link>
      <div className="product-center">
        <ProductImages images={images} />
        <section className="content">
          <h2>{name}</h2>
          <Stars reviews={reviews} stars={stars} />
          <h5 className="price">{formatPrice(price)}</h5>
          <p className="desc">{description}</p>
          <p className="info">
            <span>Available: </span>
            {stock === 0 ? 'out of stock' : 'in stock'}
          </p>
          <p className="info sku">
            <span>SKU: </span>
            {sku}
          </p>
          <p className="info">
            <span>Brand: </span>
            {company}
          </p>
          <hr />
          {stock > 0 && <AddToCart product={singleProduct} />}
        </section>
      </div>
    </div>
  </Wrapper>
}

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  .sku {
    text-transform: none;
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`

export default SingleProductPage
