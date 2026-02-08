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
  productList: [],
  status: 'loading',
  totalPages: 0,
  currentPage: 1
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
        status: 'active',
        productList: action.payload
      }

    case 'setPagination':
      return {
        ...state,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage
      }

    case 'setStatus':
      return {
        ...state,
        status: action.payload
      }

    default:
      throw new Error('Unknown actions')
  }
}

const ProductListContext = createContext()

export const ProductListProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, inititalState)

  const editorMode = data => {
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

  const changeStatus = input => {
    dispatch({
      type: 'setStatus',
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

  const paginate = (totalPages, currentPage) => {
    dispatch({
      type: 'setPagination',
      payload: {
        totalPages: totalPages,
        currentPage: currentPage
      }
    })
  }

  return (
    <ProductListContext.Provider
      value={{
        state,
        onChangeInput,
        paginate,
        setProducts,
        editorMode,
        closeEditor,
        changeStatus
      }}
    >
      {children}
    </ProductListContext.Provider>
  )
}

export const useProductList = () => useContext(ProductListContext)
