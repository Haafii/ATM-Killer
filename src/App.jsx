import React from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Maps from './pages/Maps'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";




function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/map" element={<Maps />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App