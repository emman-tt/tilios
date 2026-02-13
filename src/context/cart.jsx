import { useContext, useReducer, createContext } from 'react'
import { api } from '../api/axios'
import useToken from '../hooks/useToken'
import { autoRefresh } from '../hooks/autoRefresh'
import { toast } from 'sonner'

const CartContext = createContext()

const initialState = {
  quantity: 1,
  cartProducts: [],
  status: 'start',
  cartTotal: 0,
  checkoutDetails: {}
}

function reducer (state, action) {
  switch (action.type) {
    case 'setProducts':
      return {
        ...state,
        cartProducts: action.payload
      }

    case 'setStatus':
      return {
        ...state,
        status: action.payload
      }

    case 'setCartTotal':
      return {
        ...state,
        cartTotal: action.payload
      }

    case 'setProductQty':
      return {
        ...state,
        cartProducts: state.cartProducts.map(item =>
          item.id === action.payload.id
            ? {
                ...item,
                cartProduct: {
                  ...item.cartProduct,
                  quantity:
                    item.cartProduct.quantity + parseInt(action.payload.amount)
                }
              }
            : item
        )
      }

    case 'saveDetails':
      return {
        ...state,
        checkoutDetails: action.payload
      }

    default:
      throw new Error('Unrecognized actions here')
  }
}

export function CartProvider ({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { quantity, cartProducts, checkoutDetails, cartTotal } = state
  const { getToken } = useToken()

  function SaveCheckoutDetails (input) {
    dispatch({
      type: 'saveDetails',
      payload: input
    })
  }

  async function updateCart (type, productId) {
    dispatch({
      type: 'setProductQty',
      payload: {
        id: productId,
        amount: type === 'increase' ? 1 : -1
      }
    })

    try {
      const response = await api.put('/cart', {
        type: type,
        productId: productId
      })

      const data = await response.data
    } catch (error) {
      dispatch({
        type: 'setProductQty',
        payload: { id: productId, amount: type === 'increase' ? -1 : 1 }
      })

      toast.error('Failed to update cart. Please check your connection.')
    }
  }

  async function fetchCart () {
    try {
      dispatch({
        type: 'setStatus',
        payload: 'loading'
      })

      const response = await api.get(`/cart`)

      const data = await response.data.products
      dispatch({
        type: 'setProducts',
        payload: data
      })

      const cartTotal = (await response.data.cartTotal) || 0
      dispatch({
        type: 'setCartTotal',
        payload: parseInt(cartTotal)
      })

      if (data.length === 0 || !data) {
        dispatch({
          type: 'setStatus',
          payload: 'empty'
        })
      }
    } catch (error) {
      console.log(error)
      const status = error.status
      const serverError = error.response.data.message

      dispatch({
        type: 'setStatus',
        payload: 'empty'
      })

      if (status === 403) {
        const status = await autoRefresh()

        if (status === 'success') {
          return fetchCart()
        } else {
          return toast.error('Please sign up', {
            description: 'required for you to use the cart'
          })
        }
      }

      if (status === 405) {
        toast.error('Session timed out, please log in')
      }

      return toast.error(serverError)
    }
  }
  async function addCart (productId) {
    try {
      const addingToast = toast.success('Adding item to cart ...', {
        duration: 1000
      })
      const apiCall = await api.post(`/cart/${productId}`, {
        quantity: quantity
      })
      if (apiCall) {
        toast.success('Item added to cart')
        // addingToast.dismiss()
      }

      const cartTotal = await apiCall.data.cartTotal
      dispatch({
        type: 'setCartTotal',
        payload: parseInt(cartTotal)
      })
    } catch (error) {
      console.log(error)
      const status = error.status
      const serverError = error.response.data.message

      if (status === 401) {
        toast.error('Please sign up to use the cart')
      }

      if (status === 403) {
        const status = await autoRefresh()

        if (status === 'success') {
          return addCart(productId)
        } else {
          toast.error('Please sign up', {
            description: 'Note this is required to use the cart',
            duration: 3000
          })
          setTimeout(() => {
            window.location.href = '/auth'
          }, 3100)

          return
        }
      }

      if (status === 405) {
        toast.error('Session timed out, please log in')
      }
      return toast.error(serverError)
    }
  }

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        cartTotal,
        checkoutDetails,
        updateCart,
        fetchCart,
        addCart,
        SaveCheckoutDetails
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
