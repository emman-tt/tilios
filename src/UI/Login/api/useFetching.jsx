import { useEffect } from 'react'
import { api } from '../../../api/axios'
import { useAuth } from '../../../context/auth'
export function useFetching ({ authType }) {
  const { email, username, password } = useAuth

  useEffect(() => {
    const sumbitData = async () => {
      try {
        const response = await api.post(`/${authType}`, {
          params: {
            email: email,
            password: password,
            username: username
          }
        })

        const data = await response.data
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }

    sumbitData()
  }, [])
}
