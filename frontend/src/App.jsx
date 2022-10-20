import { ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home, Dashboard, Login, Signup } from './pages'
import { Toaster } from 'react-hot-toast'
import './App.css'
import useUserContext from './context/userContext'
import Navbar from './components/Navbar'
import Spinner from './components/Spinner'
import { useState } from 'react'

function App() {
  const { loading } = useUserContext()
  const [colorScheme, setColorScheme] = useState('dark')
  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))
  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme,
        }}>
        <Router>
          {loading && <Spinner />}
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
    </ColorSchemeProvider>
  )
}

export default App
