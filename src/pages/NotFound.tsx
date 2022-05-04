import { useNav } from '#A/hooks'

export default function NotFound() {
  const { pathname } = useNav()
  return (
    <div className="NotFound">
      <h3>React Route: Not Found</h3>
      <h3>Path: {pathname}</h3>
    </div>
  )
}
