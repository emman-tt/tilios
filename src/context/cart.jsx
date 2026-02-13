import { useContext, useReducer, createContext } from 'react'
import { api } from '../api/axios'
import useToken from '../hooks/useToken'
import { autoRefresh } from '../hooks/autoRefresh'
import { toast } from 'sonner'

const CartContext = createContext()

const initialState = {
  quantity: 1,
  cartProducts: [],
  status: 'loading',
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

    case 'deleteProduct':
      return {
        ...state,
        cartProducts: state.cartProducts.filter(
          item => item.id !== action.payload
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
  const { quantity, cartProducts, status, checkoutDetails, cartTotal } = state
  const { getToken } = useToken()

  function SaveCheckoutDetails (input) {
    dispatch({
      type: 'saveDetails',
      payload: input
    })
  }

  async function updateCart (type, productId) {
    const currentItem = cartProducts.find(item => item.id === productId)
    const currentQty = currentItem.cartProduct.quantity

    const nextQty = type === 'increase' ? currentQty + 1 : currentQty - 1

    if (nextQty === 0) {
      dispatch({ type: 'deleteProduct', payload: productId })

      return await deleteCart(productId)
    }

    dispatch({
      type: 'setProductQty',
      payload: { id: productId, amount: type === 'increase' ? 1 : -1 }
    })

    try {
      const response = await api.put('/cart', {
        type: type,
        productId: productId
      })
    } catch (error) {
      if (error.status === 404) {
        fetchCart()
        return
      }

      dispatch({
        type: 'setProductQty',
        payload: { id: productId, amount: type === 'increase' ? -1 : 1 }
      })
      toast.error('Failed to update cart.')
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

      dispatch({
        type: 'setStatus',
        payload: 'filled'
      })
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
      toast.success('Adding item to cart ...', {
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

  async function deleteCart (productId) {
    try {
      toast.dismiss()
      dispatch({
        type: 'deleteProduct',
        payload: productId
      })
      const apiCall = await api.delete(`/cart/${productId}`)
      if (apiCall) {
        toast.dismiss()
        toast.success('Item removed from  cart')
        // addingToast.dismiss()
      }
    } catch (error) {
      console.log(error)
      const status = error.status
      const serverError = error.response.data.message
      toast.dismiss()
      if (status === 403) {
        const status = await autoRefresh()

        if (status === 'success') {
          return addCart(productId)
        } else {
          toast.error('Please sign up', {
            description: ' required to use the cart',
            duration: 3000
          })
          setTimeout(() => {
            window.location.href = '/auth'
          }, 3100)

          return
        }
      }

      if (status === 405) {
        toast.dismiss()
        toast.error('Session timed out, please log in')
        setTimeout(() => {
          window.location.href = '/auth'
        }, 3100)
        return
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
        deleteCart,
        status,
        SaveCheckoutDetails
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
