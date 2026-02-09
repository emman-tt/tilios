import { api } from '../../../../api/axios'
import { useProductList } from '../../../../context/productlist'
import useToken from '../../../../hooks/useToken'
import { autoRefresh } from '../../../../hooks/autorefresh'
import { useEffect } from 'react'
export function useFetch () {
  const { getToken } = useToken()
  const { state, setProducts, paginate, changeStatus } = useProductList()
  const { category, limit, page } = state

  async function fetchProducts () {
    try {
      changeStatus('loading')
      const accessToken = getToken()

      const response = await api.get('/admin/products', {
        params: {
          category: category,
          limit: limit || 10,
          page: page || 1
        }
      })

      const data = response?.data
      const products = data.products
      const currentPage = page
      const totalPages = data.totalPages

      paginate(totalPages, currentPage)
      setProducts(products)
      changeStatus('active')
    } catch (error) {
      const response = await error?.response

      const statusCode = await response?.status
      if (statusCode === 401) {
        return console.log('no token at all hence unauthorized')
      }

      if (statusCode === 403) {
        await autoRefresh()
        fetchProducts()

        return
      }

      console.log('server error')
      console.log(response?.data)
    }
  }

  // async function editProduct () {
  //   try {
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  useEffect(() => {
    fetchProducts()
  }, [page, limit, category])

  return { fetchProducts }
}
