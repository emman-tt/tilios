export default function useToken () {
  const getToken = () => {
    const tokenString = localStorage.getItem('accessToken')
    if (!tokenString) return null

    try {
      const userToken = JSON.parse(tokenString)
      return userToken?.accessToken || userToken
    } catch (e) {
      return null
    }
  }

  const saveToken = token => {
    localStorage.setItem('accessToken', JSON.stringify(token))
  }

  const removeToken = () => {
    localStorage.removeItem('accessToken')
  }

  return {
    getToken,
    saveToken,
    removeToken
  }
}
