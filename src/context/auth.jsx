import { useReducer } from 'react'
import { useContext, createContext } from 'react'
import { api } from '../api/axios'
import useToken from '../hooks/useToken'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
const initialState = {
  email: '',
  password: '',
  username: '',
  showError: false,
  error: '',
  authType: 'user',
  status: 'ready'
}
const AuthContext = createContext()

const { getToken, saveToken } = useToken()

function reducer (state, action) {
  switch (action.type) {
    case 'setEmail':
      return {
        ...state,
        showError: false,
        email: action.payload
      }

    case 'setPassword':
      return {
        ...state,
        showError: false,
        password: action.payload
      }

    case 'setUsername':
      return {
        ...state,
        showError: false,
        username: action.payload
      }
    case 'setError':
      return {
        ...state,
        error: action.payload,
        showError: true
      }
    case 'changeAuthType':
      return {
        ...state,
        authType: action.payload
      }

    case 'changeStatus':
      return {
        ...state,
        status: action.payload
      }

    default:
      throw new Error('Unrecognized actions')
  }
}

export function AuthProvider ({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const navigate = useNavigate()
  const {
    email,
    password,
    authType,
    showError,
    error,
    username,
    token,
    status
  } = state
  let hasErrors = false

  function changeAuthType (input) {
    dispatch({
      type: 'changeAuthType',
      payload: input
    })
    showLoader()
  }

  function showLoader () {
    dispatch({ type: 'changeStatus', payload: 'loading' })
    setTimeout(() => {
      dispatch({
        type: 'changeStatus',
        action: 'ready'
      })
    }, 1000)
  }

  const registerAdmin = async () => {
    try {
      if (hasErrors) {
        return
      }
      toast.dismiss()
      const response = await api.post(`/admin-register`, {
        email: email,
        password: password,
        username: username
      })

      const data = await response.data

      setTimeout(() => {
        dispatch({
          type: 'changeStatus',
          action: 'ready'
        })
      }, 1000)

      toast.success('Admin account successfully created!', {
        description: 'Please login with your credentials...'
      })
      navigate('/auth')
      // changeAuthType('admin')
    } catch (error) {
      const errorData = error?.response?.data
      console.log(errorData)

      setTimeout(() => {
        dispatch({
          type: 'changeStatus',
          action: 'ready'
        })
      }, 1000)

      if (error.response.status === 400) {
        toast.error('Signup Failed', {
          description: errorData.message
        })
        return navigate('/auth')
      }

      // if (errorData.status === 'failed') {
      //   return toast.error('Signup Failed', {
      //     description: errorData.message
      //   })
      // }

      if (error.request) {
        return toast.error('Server error', {
          description: 'No response received. Server might be down.'
        })
      }

      console.log(error)
    }
  }

  const loginAdmin = async () => {
    try {
      if (hasErrors) {
        console.log('missing fields')
        return
      }
      toast.dismiss()

      dispatch({ type: 'changeStatus', payload: 'loading' })

      const response = await api.post(`/admin-login`, {
        email: email,
        password: password
      })

      const data = await response.data
      const accessToken = data.accessToken
      saveToken(accessToken)

      setTimeout(() => {
        dispatch({
          type: 'changeStatus',
          action: 'ready'
        })
      }, 1000)

      toast.success('Welcome back , Admin!', {
        description: 'Redirecting to your Dashboard...'
      })
    } catch (error) {
      console.log(error)
      setTimeout(() => {
        dispatch({
          type: 'changeStatus',
          action: 'ready'
        })
      }, 1000)
      toast.error('Login Failed', {
        description: 'Login credentials are incorrect'
      })
    }
  }

  const registerUser = async () => {
    try {
      if (hasErrors) {
        return
      }
      toast.dismiss()
      dispatch({ type: 'changeStatus', payload: 'loading' })

      const response = await api.post(`/register`, {
        email: email,
        password: password,
        username: username
      })

      const data = await response.data

      setTimeout(() => {
        dispatch({
          type: 'changeStatus',
          action: 'ready'
        })
      }, 1000)

      toast.success('Account successfully created!', {
        description: 'Please login with your credentials...'
      })

      navigate('/auth')
    } catch (error) {
      const errorData = error?.response?.data
      console.log(errorData)

      setTimeout(() => {
        dispatch({
          type: 'changeStatus',
          action: 'ready'
        })
      }, 1000)

      if (error.response.status === 400) {
        toast.error('Signup Failed', {
          description: errorData.message
        })
        return navigate('/auth')
      }

      // if (errorData.status === 'failed') {
      //   return toast.error('Signup Failed', {
      //     description: errorData.message
      //   })
      // }

      if (error.request) {
        return toast.error('Server error', {
          description: 'No response received. Server might be down.'
        })
      }

      console.log(error)
    }
  }

  const loginUser = async () => {
    try {
      if (hasErrors) {
        console.log('missing fields')
        return
      }
      toast.dismiss()

      dispatch({ type: 'changeStatus', payload: 'loading' })

      const response = await api.post(`/login`, {
        email: email,
        password: password
      })

      const data = await response.data
      const accessToken = data.accessToken

      saveToken(accessToken)
      setTimeout(() => {
        dispatch({
          type: 'changeStatus',
          action: 'ready'
        })
      }, 1000)

      toast.success('Welcome back!', {
        description: 'Redirecting to your homepage...'
      })

      navigate('/')
    } catch (error) {
      console.log(error)
      setTimeout(() => {
        dispatch({
          type: 'changeStatus',
          action: 'ready'
        })
      }, 1000)
      toast.error('Login Failed', {
        description: 'Login credentials are incorrect'
      })
    }
  }

  const fillEmail = input => {
    dispatch({ type: 'setEmail', payload: input })
  }

  const fillPassword = input => {
    dispatch({ type: 'setPassword', payload: input })
  }
  const fillUsername = input => {
    dispatch({ type: 'setUsername', payload: input })
  }

  const setErrorMessage = authType => {
    const formattedEmail = email.toLowerCase().trim()
    const formattedName = username.toLowerCase().trim()
    const formattedPassword = password.toLowerCase().trim()
    if (formattedEmail.length < 1) {
      hasErrors = true
      return dispatch({ type: 'setError', payload: 'Email is required' })
    }

    if (
      formattedEmail.includes('@') == false ||
      formattedEmail.includes('mail') == false ||
      formattedEmail.includes('.com') == false
    ) {
      hasErrors = true
      return dispatch({
        type: 'setError',
        payload: "Email must include '@mail.com'"
      })
    }

    if (formattedName.length < 1 && authType === 'signup') {
      hasErrors = true
      return dispatch({ type: 'setError', payload: 'Username is required' })
    }

    if (formattedPassword.length < 8) {
      hasErrors = true
      return dispatch({
        type: 'setError',
        payload: 'Password must be at least 8 characters'
      })
    }
    const checks = {
      hasLetters: /[a-z]/.test(password) || /[A-Z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSymbol: /[!@#$%^&*(),.?":{}|<>$/]/.test(password)
    }

    if (!checks.hasLetters || !checks.hasNumber || !checks.hasSymbol) {
      hasErrors = true
      return dispatch({
        type: 'setError',
        payload:
          'Password must at least have a symbol(!@#$%^&*(),.?)   number(1-9)   and letters(a-z)'
      })
    }
  }

  return (
    <AuthContext.Provider
      value={{
        showError,
        error,
        setErrorMessage,
        email,
        password,
        username,
        fillEmail,
        fillPassword,
        fillUsername,
        changeAuthType,
        registerUser,
        loginUser,
        authType,
        status,
        loginAdmin,
        registerAdmin
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
