import { useNav } from '#A/hooks'
import { MyHeader } from '#C/header/Header'

export default function NotFound() {
  const { pathname } = useNav()
  return (
    <div className="NotFound">
      <MyHeader title="页面未找到" error={{ name: 'PATH', message: pathname }} />
    </div>
  )
}
