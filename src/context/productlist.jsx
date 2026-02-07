import { createContext, useContext, useReducer } from 'react'

const inititalState = {
  name: '',
  price: 0,
  stock: 0,
  category: '',
  discount: 0,
  image: '',
  entries: 0,
  showEditor: false,
  products: []
}

function reducer (state, action) {
  switch (action.type) {
    case 'editor':
      return { ...state, ...action.payload, showEditor: true }

    case 'closeEditor':
      return {
        ...state,
        showEditor: false
      }

    case 'setField':
      return {
        ...state,
        [action.fieldType]: action.payload
      }

    case 'setProducts':
      return {
        ...state,
        products: action.payload
      }
    default:
      throw new Error('Unknown actions')
  }
}

const ProductListContext = createContext()

export const ProductListProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, inititalState)

  const editorMode = data => {
    console.log(data)
    dispatch({ type: 'editor', payload: data })
  }

  const closeEditor = data => {
    dispatch({
      type: 'closeEditor'
    })
  }

  const setProducts = input => {
    dispatch({
      type: 'setProducts',
      payload: input
    })
  }

  const onChangeInput = (fieldType, input) => {
    dispatch({
      type: 'setField',
      fieldType,
      payload: input
    })
  }

  return (
    <ProductListContext.Provider
      value={{ state, onChangeInput, setProducts, editorMode, closeEditor }}
    >
      {children}
    </ProductListContext.Provider>
  )
}

export const useProductList = () => useContext(ProductListContext)
