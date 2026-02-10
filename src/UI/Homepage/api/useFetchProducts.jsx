import { useEffect } from 'react'
import { useProductContext } from '../../../context/product'
import { api } from '../../../api/axios'
import { autoRefresh } from '../../../hooks/autorefresh'

export function useFetchProducts () {
  const { state, fetchProducts, fetchProductsError } = useProductContext()
  const { category } = state
  console.log(category)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/products', {
          params: {
            category: category,
            limit: 12
          }
        })

        const products = response.data.products
        fetchProducts(products)
      } catch (error) {
        console.log(error)
        //  const status = error.status
        // if (status === 403) {
        //   autoRefresh()
        //   return fetchData()
        // }

        fetchProductsError()
      }
    }

    fetchData()
  }, [category])
}
