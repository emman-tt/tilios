import { createContext, useContext, useReducer } from 'react'
import { api } from '../api/axios'

const inititalState = {
  name: '',
  price: 0,
  stock: 0,
  serverCategory: 0,
  discount: 0,
  image: '',
  productId: 0,
  limit: 10,
  page: 1,
  showEditor: false,
  productList: [],
  status: 'loading',
  totalPages: 0,
  currentPage: 1,
  categoryValue: '',
  category: 0,
  showDeleteModal: false
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

    case 'setParams':
      return {
        ...state,
        [action.name]: action.payload
      }

    case 'deleteMode':
      return {
        ...state,
        showDeleteModal: action.payload,
        productId: action.product
      }

    default:
      throw new Error('Unknown actions')
  }
}

const ProductListContext = createContext()

export const ProductListProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, inititalState)
  const {
    name,
    price,
    stock,
    image,
    category,
    discount,
    productId,
    serverCategory
  } = state
  const editorMode = data => {
    dispatch({ type: 'editor', payload: data })
  }

  const deleteMode = (boolean, id) => {
    dispatch({
      type: 'deleteMode',
      payload: boolean,
      product: id
    })
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

  const setParams = (name, input) => {
    dispatch({
      type: 'setParams',
      name: name,
      payload: input
    })
  }

  async function updateProduct () {
    try {
      await api.put(`/admin/update-product/${productId}`, {
        name: name,
        stock: stock,
        discount: discount,
        price: price,
        category: serverCategory,
        image: image
      })
    } catch (error) {
      console.log(error)
    }
  }

  async function deleteProduct () {
    try {
      await api.delete(`/admin/delete-product/${productId}`)
      deleteMode(false, 0)
    } catch (error) {
      console.log(error)
    }
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
        changeStatus,
        setParams,
        updateProduct,
        deleteMode,
        deleteProduct
      }}
    >
      {children}
    </ProductListContext.Provider>
  )
}

export const useProductList = () => useContext(ProductListContext)
