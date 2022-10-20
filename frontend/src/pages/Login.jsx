import {
  Button,
  Center,
  Container,
  FileInput,
  Grid,
  Group,
  Stack,
  TextInput,
  Title,
} from '@mantine/core'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import useUserContext from '../context/userContext'
import { IconBrandFacebook, IconBrandGoogle } from '@tabler/icons'
import { useEffect } from 'react'

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const { sendRequest, logIn } = useUserContext()
  const { email, password } = formData

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/dashboard')
    }
  }, [])

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleLogin = async () => {
    if (!email || !password) {
      return toast.error('Please fill all the required fields')
    }
    const res = await sendRequest('/login', 'post', formData)
    if (res?.success) {
      logIn(res)
      navigate('/dashboard')
    }
  }

  return (
    <Container size={450}>
      <Stack>
        <Center>
          <Title>Login</Title>
        </Center>
        <TextInput
          placeholder='Email'
          label='Email'
          withAsterisk
          type='email'
          name='email'
          value={email}
          onChange={onChange}
        />
        <TextInput
          placeholder='Password'
          label='Password'
          withAsterisk
          type='password'
          name='password'
          value={password}
          onChange={onChange}
        />
        <Button onClick={handleLogin}>Login</Button>

        <Button color='red'>
          <IconBrandGoogle
            height={18}
            width={18}
            style={{ marginRight: '1rem' }}
          />
          Continue with Google
        </Button>

        <Button color='gray'>
          <IconBrandFacebook
            height={18}
            width={18}
            style={{ marginRight: '1rem' }}
          />
          Continue with Facebook
        </Button>

        <Button onClick={() => navigate('/signup')} variant='outline'>
          Don't have an account?
        </Button>
      </Stack>
    </Container>
  )
}

export default Login
