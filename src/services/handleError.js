import { toast } from 'sonner'
import { autoRefresh } from '../hooks/autoRefresh'

export async function handleError (callbackfn, error, ...params) {
  const status = error.status
  const serverError = error?.response?.data.message
  console.log('status', status)
  if (status === 401) {
    return status
  }

  if (status === 403) {
    const refreshResult = await autoRefresh()

    if (refreshResult === 'success') {
      await callbackfn(...params)
      return 201
    } else {
      const status = 401
      return status
    }
  }

  if (status === 405) {
    return status
  }

  if (status === 406) {
    return 406
  }
  console.log(serverError)
}

// My system Error Status Codes meaning
// 401- unauthorized
// 403- expired access token but existing refresh token so autoRefresh()
// 405- refresh token is expired hence restart login again
