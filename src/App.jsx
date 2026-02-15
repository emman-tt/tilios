import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom'
import { Toaster } from 'sonner'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import SignUp from './UI/Login/Signup'
import Login from './UI/Login/Login'
import { ProductProvider } from './context/product'
import Dashboard from './pages/DashboardPage'
import AddProduct from './UI/Dashboard/AddProduct/page'
import Overview from './UI/Dashboard/Overview/page'
import ProductList from './UI/Dashboard/ProductList/page'
import Settings from './UI/Dashboard/Settingss/page'
import { ProductListProvider } from './context/productlist'
import { AddProductProvider } from './context/add-product'
import { OverviewProvider } from './context/overview'
import CartPage from './pages/CartPage'
import Cartlist from './UI/Cart/Cartlist/CartList'
import { CartProvider } from './context/cart'
import Checkout from './UI/Cart/Checkout/Checkout'
import Order from './UI/Cart/Order/Order'
function App () {
  return (
    <ProductProvider>
      <Toaster
        position='top-center'
        richColors
        toastOptions={{
          style: {
            fontSize: 15
          }
        }}
      />
      <CartProvider>
        <OverviewProvider>
          <AddProductProvider>
            <ProductListProvider>
              <BrowserRouter>
                <Routes>
                  <Route index path='/' element={<HomePage />} />
                  <Route path='/auth' element={<AuthPage />}>
                    <Route index element={<Login />} />
                    <Route path='signup' element={<SignUp />} />
                  </Route>

                  <Route path='/dashboard' element={<Dashboard />}>
                    <Route index element={<Overview />} />
                    <Route path='addproduct' element={<AddProduct />} />
                    <Route path='productlist' element={<ProductList />} />
                    <Route path='settings' element={<Settings />} />
                  </Route>

                  <Route path='/cart' element={<CartPage />}>
                    <Route index element={<Navigate to='cartlist' replace />} />
                    <Route path='cartlist' element={<Cartlist />} />
                    <Route path='checkout' element={<Checkout />} />
                    <Route path='success' element={<Order />} />
                  </Route>
                </Routes>
              </BrowserRouter>
            </ProductListProvider>
          </AddProductProvider>
        </OverviewProvider>
      </CartProvider>
    </ProductProvider>
  )
}

export default App
