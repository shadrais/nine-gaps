import {
  Button,
  Center,
  Container,
  FileInput,
  Grid,
  Stack,
  TextInput,
  Title,
} from '@mantine/core'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import useUserContext from '../context/userContext'

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const { sendRequest, logIn } = useUserContext()
  const { email, password } = formData

  const onChange = (e) => {
    console.log()
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleLogin = async () => {
    if (!email || !password) {
      return toast.error('Please fill all the required fields')
    }
    const res = await sendRequest(
      'http://localhost:3000/v1/login',
      'post',
      formData
    )
    if (res?.success) {
      logIn(res)
      navigate('/dashboard')
    }
  }

  return (
    <Container size={400}>
      <Stack>
        <Center>
          <Title>Sign Up</Title>
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
        <Button variant='outline'>Don't have an account?</Button>
      </Stack>
    </Container>
  )
}

export default Login
