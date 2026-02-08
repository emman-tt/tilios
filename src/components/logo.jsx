import { Volleyball } from 'lucide-react'
import { NavLink } from 'react-router-dom'
export default function Logo ({ classname }) {
  return (
    <NavLink to={'/'} className={classname}>
      Tilios <Volleyball size={20} />
    </NavLink>
  )
}
