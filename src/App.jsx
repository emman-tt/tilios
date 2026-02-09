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
            </Routes>
          </BrowserRouter>
        </ProductListProvider>
      </AddProductProvider>
    </ProductProvider>
  )
}

export default App
