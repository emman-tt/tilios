import { Route, BrowserRouter, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'

import { ProductProvider } from './context/product'

function App () {
  return (
    <ProductProvider>
      <BrowserRouter>
        <Routes>
          <Route index path='/' element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </ProductProvider>
  )
}

export default App
