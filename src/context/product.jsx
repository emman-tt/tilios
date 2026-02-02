import { useContext, useReducer, createContext } from 'react'

const ProductContext = createContext()

const initialState = {
  products: [],
  status: 'start',
  category: 0
}

function reducer (state, action) {
  switch (action.type) {
    case 'success':
      return {
        ...state,
        status: 'success',
        products: action.payload
      }

    case 'changeCategory':
      return {
        ...state,
        status: 'fetching',
        category: action.payload
      }
    case 'error':
      return {
        ...state,
        products: [],
        status: 'error'
      }

    default:
      throw new Error('Unrecognized actions here')
  }
}

export function ProductProvider ({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const changeCategory = number => {
    dispatch({ type: 'changeCategory', payload: number })
  }
  const fetchProducts = product =>
    dispatch({ type: 'success', payload: product })

  const fetchProductsError = () =>
    dispatch({
      type: 'error'
    })
  return (
    <ProductContext.Provider
      value={{ state, fetchProducts, fetchProductsError, changeCategory }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export const useProductContext = () => useContext(ProductContext)
