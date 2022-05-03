import Demo from '#C/demo/Demo'
import Home from '#C/home/Home'
import { NavLink, Route, Routes } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <div className="App">
      <div className="linked">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/demo">Demo</NavLink>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/demo" element={<Demo />} />
      </Routes>
    </div>
  )
}

export default App
