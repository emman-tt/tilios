import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom'
import { Toaster } from 'sonner'
import { lazy, Suspense } from 'react'
import { ProductProvider } from './context/product'
import { ProductListProvider } from './context/productlist'
import { AddProductProvider } from './context/add-product'
import { OverviewProvider } from './context/overview'
import { CartProvider } from './context/cart'
const HomePage = lazy(() => import('./pages/HomePage'))
const AuthPage = lazy(() => import('./pages/AuthPage'))
const AddProduct = lazy(() => import('./UI/Dashboard/AddProduct/page'))
const Overview = lazy(() => import('./UI/Dashboard/Overview/page'))
const ProductList = lazy(() => import('./UI/Dashboard/ProductList/page'))
const Settings = lazy(() => import('./UI/Dashboard/Settingss/page'))
const Dashboard = lazy(() => import('./pages/DashboardPage'))
const CartPage = lazy(() => import('./pages/CartPage'))
const SignUp = lazy(() => import('./UI/Login/Signup'))
const Login = lazy(() => import('./UI/Login/Login'))
const Cartlist = lazy(() => import('./UI/Cart/Cartlist/CartList'))
const Checkout = lazy(() => import('./UI/Cart/Checkout/Checkout'))
const Order = lazy(() => import('./UI/Cart/Order/Order'))
const Orders = lazy(() => import('./UI/Dashboard/Orders/page'))
const Customers = lazy(() => import('./UI/Dashboard/Customers/page'))
// dist/assets/index-Cy4kjWxQ.css     49.72 kB │ gzip:   8.85 kB
// dist/assets/index-DM1T_SbD.js   1,721.00 kB │ gzip: 572.93 kB
import Loader from './components/Loader'
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
                <Suspense fallback={<Loader />}>
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
                      <Route path='orders' element={<Orders />} />
                      <Route path='customers' element={<Customers />} />
                    </Route>

                    <Route path='/cart' element={<CartPage />}>
                      <Route
                        index
                        element={<Navigate to='cartlist' replace />}
                      />
                      <Route path='cartlist' element={<Cartlist />} />
                      <Route path='checkout' element={<Checkout />} />
                      <Route path='success' element={<Order />} />
                    </Route>
                  </Routes>
                </Suspense>
              </BrowserRouter>
            </ProductListProvider>
          </AddProductProvider>
        </OverviewProvider>
      </CartProvider>
    </ProductProvider>
  )
}

export default App
