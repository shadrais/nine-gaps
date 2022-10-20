import { MantineProvider } from '@mantine/core'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home, Dashboard, Login, Signup } from './pages'
import { Toaster } from 'react-hot-toast'
import './App.css'
import useUserContext from './context/userContext'
import Navbar from './components/Navbar'
import Spinner from './components/Spinner'

function App() {
  const { loading } = useUserContext()
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: 'dark',
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
  )
}

export default App
