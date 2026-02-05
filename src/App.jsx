import { Route, BrowserRouter, Routes } from 'react-router-dom'
import { Toaster } from 'sonner'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import SignUp from './UI/Login/Signup'
import Login from './UI/Login/Login'

import { ProductProvider } from './context/product'

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

      <BrowserRouter>
        <Routes>
          <Route index path='/' element={<HomePage />} />
          <Route path='/auth' element={<AuthPage />}>
            <Route index element={<Login />} />
            <Route path='signup' element={<SignUp />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ProductProvider>
  )
}

export default App
