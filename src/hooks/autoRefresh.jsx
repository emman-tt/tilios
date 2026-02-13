
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
    const status = data.status


 
    return status
  } catch (error) {
    console.log(error)
  }
}
