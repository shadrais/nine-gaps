import { MantineProvider } from '@mantine/core'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home, Dashboard, Login, Signup } from './pages'
import { Toaster } from 'react-hot-toast'
import './App.css'
import Navbar from './components/Navbar'

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
        <Toaster />
      </Router>
    </MantineProvider>
  )
}

export default App
