import { Counter } from '#F/counter/Counter'
import './Demo.css'
import logo from './logo.svg'

export default function Demo() {
  return (
    <div className="Demo">
      <header className="Demo-header">
        <img src={logo} className="Demo-logo" alt="logo" />
        <Counter />
      </header>
    </div>
  )
}
