import React from 'react'
import { useFilterContext } from '../context/filterContext'
import GridView from './GridView'
import ListView from './ListView'

const ProductList = () => {
  const { filteredProducts, useGridView } = useFilterContext()

  if (!filteredProducts || filteredProducts.length === 0) {
    return <h5 style={{ textTransform: 'none' }}>
      Sorry, no products matched your search.
    </h5>
  }

  if (useGridView) {
    return <GridView products={filteredProducts} />
  } else {
    return <ListView products={filteredProducts} />
  }
}

export default ProductList
