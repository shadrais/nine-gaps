import axios from 'axios'
import { useEffect } from 'react'
import { createContext, useContext, useState } from 'react'
import toast from 'react-hot-toast'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    console.log('useEffect')
    const token = localStorage.getItem('token')
    if (token) {
      setUser(token)
    } else {
      setUser(null)
    }
  }, [])

  const logIn = (user) => {
    console.log('login')
    localStorage.setItem('token', user.token)
    setUser(user)
  }

  const logOut = () => {
    setUser(null)
    localStorage.removeItem('token')
  }

  const sendRequest = async (url, method, body, type = 'json') => {
    const config = {
      headers: {
        'Content-Type':
          type === 'json' ? 'application/json' : 'multipart/form-data',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
    try {
      setLoading(true)
      if (method === 'get') {
        const res = await axios.get(url, config)
        return res.data
      }
      if (method === 'post') {
        const res = await axios[method](url, body, {
          headers: {
            'Content-Type':
              type === 'json' ? 'application/json' : 'multipart/form-data',
            authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        return res.data
      }
    } catch (error) {
      console.log(error.response.data)
      if (error.response.data.message.includes('Session expired')) {
        logOut()
      }
      toast.error(error.response.data.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <UserContext.Provider value={{ loading, sendRequest, logIn, logOut, user }}>
      {children}
    </UserContext.Provider>
  )
}

const useUserContext = () => useContext(UserContext)
export default useUserContext
