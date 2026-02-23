import { useContext, useReducer, createContext } from 'react'
import { api } from '../api/axios'
import useToken from '../hooks/useToken'
import { toast } from 'sonner'
import { handleError } from '../services/handleError'
const AddProductContext = createContext()

const initialState = {
  title: '',
  category: 1,
  price: 0,
  stock: 0,
  discount: 0,
  image: '',
  status: 'loaded'
}

function reducer (state, action) {
  switch (action.type) {
    case 'inputChange':
      return {
        ...state,
        [action.fieldType]: action.payload
      }

    case 'changeStatus':
      return {
        ...state,
        status: action.payload
      }

    default:
      throw new Error('Unrecognized actions here')
  }
}

export function AddProductProvider ({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { image, stock, price, title, name, discount, category } = state

  const { getToken } = useToken()

  const handleInput = (fieldType, input) => {
    dispatch({
      type: 'inputChange',
      fieldType: fieldType,
      payload: input
    })
  }

  async function addProduct () {
    try {
      dispatch({
        type: 'changeStatus',
        payload: 'loading'
      })

      const formData = new FormData()
      formData.append('title', title)
      formData.append('image', image)
      formData.append('stock', stock)
      formData.append('price', price)
      formData.append('name', name)
      formData.append('discount', discount)
      formData.append('category', category)

      await api.post('/admin/add-product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      dispatch({
        type: 'changeStatus',
        payload: 'loaded'
      })

      return toast.success('Product added successfully')
    } catch (error) {
      dispatch({
        type: 'changeStatus',
        payload: 'loaded'
      })
      const code = await handleError(addProduct, error)
      if (code === 401) {
        return toast.error('Unauthorized')
      }
      console.log(error)
      return toast.error(error.response.message)
    }
  }

  return (
    <AddProductContext.Provider value={{ state, addProduct, handleInput }}>
      {children}
    </AddProductContext.Provider>
  )
}

export const useAddProduct = () => useContext(AddProductContext)
