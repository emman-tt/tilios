import { useContext, useReducer, createContext } from 'react'
import { api } from '../api/axios'
import useToken from '../hooks/useToken'
import { autoRefresh } from '../hooks/autoRefresh'
import { toast } from 'sonner'

const CartContext = createContext()

const initialState = {
  quantity: 1,
  cartProducts: []
}

function reducer (state, action) {
  switch (action.type) {
    case 'setProducts':
      return {
        ...state,
        cartProducts: action.payload
      }
    default:
      throw new Error('Unrecognized actions here')
  }
}

export function CartProvider ({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { quantity, cartProducts } = state
  const { getToken } = useToken()

  const updateQty = operator => {
    dispatch({
      type: 'inputChange',
      fieldType: fieldType,
      payload: input
    })
  }

  async function fetchCart () {
    try {
      const accessToken = getToken()

      const response = await api.get(`/cart`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

      const data = await response.data.products
      dispatch({
        type: 'setProducts',
        payload: data
      })
    } catch (error) {
      console.log(error)
      const status = error.status
      const serverError = error.response.data.message
      if (status === 403) {
        await autoRefresh()
        return fetchCart()
      }

      if (status === 405) {
        toast.error('Session timed out, please log in')
      }

      return toast.error(serverError)
    }
  }
  async function addCart (productId) {
    try {
      const accessToken = getToken()

      await api.post(
        `/cart/${productId}`,
        {
          quantity: quantity
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

      if (status === 401) {
        toast.error('Please sign up to use the cart')
      }

      if (status === 403) {
        await autoRefresh()
        return addCart(productId)
      }

      if (status === 405) {
        toast.error('Session timed out, please log in')
      }
      return toast.error(serverError)
    }
  }

  return (
    <CartContext.Provider value={{ cartProducts, fetchCart, addCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
