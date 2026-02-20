export default function Overlay ({ classname, z = 25 }) {
  return (
    <div
      className={`fixed inset-0 backdrop-blur-sm  bg-[#1a191948] ${z} ${classname}`}
    ></div>
  )
}
