import _ from 'lodash'

export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price / 100)
}

export const getUniqueValues = (data, type) => {
  return ['all', ..._.uniq(_.flatMapDeep(data.map((item) => item[type]))).sort()]
}
