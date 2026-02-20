import { toast } from 'sonner'
import { autoRefresh } from '../hooks/autoRefresh'

export async function handleError (callbackfn, error, ...params) {
  console.log(error)
  const status = error.status
  const serverError = error?.response?.data.message

  if (status === 401) {
    return toast.error('Please sign up to use the cart')
  }

  if (status === 403) {
    const status = await autoRefresh()

    if (status === 'success') {
      return callbackfn(...params)
    } else {
      //   toast.error('Please sign up', {
      //     description: 'Note this is required to use the cart',
      //     duration: 3000
      //   })
      setTimeout(() => {
        window.location.href = '/auth'
      }, 3100)

      return
    }
  }

  if (status === 405) {
    return toast.error('Session timed out, please log in')
  }
  return { serverError, status }
}
