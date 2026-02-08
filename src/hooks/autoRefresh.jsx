import { api } from '../api/axios'
import useToken from './useToken'
export async function autoRefresh () {
  const { saveToken } = useToken()
  try {
    const response = await api.post('/auth/refresh')
    const data = await response.data

    const msg = data?.message
    const accessToken = data?.accessToken
    saveToken(accessToken)

    console.log(msg)
  } catch (error) {
    console.log(error)
  }
}
