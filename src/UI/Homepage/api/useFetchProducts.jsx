import { useEffect } from 'react'
import { useProductContext } from '../../../context/product'
import { api } from '../../../api/axios'

export function useFetchProducts () {
  const { state, fetchProducts, fetchProductsError } = useProductContext()
  const { category } = state
  
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
        // console.log(error)

        fetchProductsError()
      }
    }

    fetchData()
  }, [category])
}
