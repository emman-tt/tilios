import { api } from '../../../../api/axios'
import { useProductList } from '../../../../context/productlist'
export function useFetch () {
  const { setProducts } = useProductList()

  async function fetchProducts () {
    try {
      const response = await api.get('/products', {
        params: {
          category: category,
          limit: 10,
          page: 1
        }
      })
      const data = response.data.products

      setProducts(data)
    } catch (error) {
      console.log(error)
    }
  }

  async function editProduct () {
    try {
    } catch (error) {
      console.log(error)
    }
  }
}
