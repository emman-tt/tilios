import { useReducer } from 'react'
import { useContext, createContext } from 'react'
const initialState = {
  email: '',
  password: '',
  username: '',
  showError: false,
  error: ''
}
const AuthContext = createContext()

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

    default:
      throw new Error('Unrecognized actions')
  }
}

export function AuthProvider ({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { email, password, showError, error, username } = state
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
      return dispatch({ type: 'setError', payload: 'Email is required' })
    }

    if (
      formattedEmail.includes('@') == false ||
      formattedEmail.includes('mail') == false ||
      formattedEmail.includes('.com') == false
    ) {
      return dispatch({
        type: 'setError',
        payload: "Email must include '@mail.com'"
      })
    }

    if (formattedName.length < 1 && authType === 'signup') {
      return dispatch({ type: 'setError', payload: 'Username is required' })
    }

    if (formattedPassword.length < 8) {
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
        fillUsername
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
