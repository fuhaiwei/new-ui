import { useAppSelector } from '##/app/hooks'
import './Home.css'
import logo from './logo.svg'

export default function Home() {
  const state = useAppSelector((state) => state)
  return (
    <div className="HOME">
      <header className="Home-header">
        <img src={logo} className="Home-logo" alt="logo" />
        {JSON.stringify(state)}
      </header>
    </div>
  )
}
