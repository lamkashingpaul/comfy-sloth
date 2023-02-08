import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { ProductsProvider } from './context/productsContext'
import { FilterProvider } from './context/filterContext'
import { CartProvider } from './context/cartContext'
import { UserProvider } from './context/userContext'
import { Auth0Provider } from '@auth0/auth0-react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      cacheLocation="localstorage"
      authorizationParams={{
        redirect_uri: `${window.location.origin}${import.meta.env.BASE_URL}`
      }}
    >
      <UserProvider>
        <ProductsProvider>
          <FilterProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </FilterProvider>
        </ProductsProvider>
      </UserProvider>
    </Auth0Provider>
  </React.StrictMode>
)
