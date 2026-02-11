import { useNavigate } from 'react-router-dom'

export function navigate (item) {
  const navigate = useNavigate()
  navigate(`${item}`)
}
