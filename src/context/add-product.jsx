import { useContext, useReducer, createContext } from 'react'
import { api } from '../api/axios'
import useToken from '../hooks/useToken'
const AddProductContext = createContext()

const initialState = {
  title: '',
  category: 1,
  price: 0,
  stock: 0,
  discount: 0,
  image: ''
}

function reducer (state, action) {
  switch (action.type) {
    case 'inputChange':
      return {
        ...state,
        [action.fieldType]: action.payload
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

  function addProduct () {
    try {
      const accessToken = getToken()

      api.post(
        '/admin/add-product',
        {
          title: title,
          image: image,
          stock: stock,
          price: price,
          name: name,
          discount: discount,
          category: category
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )

      return toast.success('Product added successfully')
    } catch (error) {
      console.log(error)
      const status = error.status
      const serverError = error.response.data.message
      if (status === 403) {
        return toast.error('Session timed out please login ')
      }

      return toast.error(serverError)
    }
  }

  return (
    <AddProductContext.Provider value={{ state, addProduct, handleInput }}>
      {children}
    </AddProductContext.Provider>
  )
}

export const useAddProduct = () => useContext(AddProductContext)
