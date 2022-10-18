import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  Center,
  Title,
  Grid,
  Input,
  Stack,
  TextInput,
  FileInput,
  Button,
} from '@mantine/core'
const Signup = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [handleImage, setHandleImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const { firstName, lastName, email, password, confirmPassword } = formData

  const onChange = (e) => {
    console.log()
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSignup = async () => {
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return toast.error('Please fill all the required fields')
    }
    if (password !== confirmPassword) {
      return toast.error('Passwords do not match')
    }
    try {
      setLoading(true)
      const data = new FormData()
      data.append('firstName', firstName)
      data.append('lastName', lastName)
      data.append('email', email)
      data.append('password', password)
      data.append('confirmPassword', confirmPassword)
      data.append('profilePicture', handleImage)
      const res = await axios.post('http://localhost:3000/v1/signup', data)
      console.log(res)
      if (res.data.success) {
        localStorage.setItem('token', res.data.token)
        navigate('/dashboard')
      }
    } catch (error) {
      console.log(error.response.data)
      toast.error(error.response.data.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container size={400}>
      <Stack>
        <Center>
          <Title>Sign Up</Title>
        </Center>
        <Grid>
          <Grid.Col span={6}>
            <TextInput
              placeholder='Your name'
              label='First name'
              withAsterisk
              name='firstName'
              value={firstName}
              onChange={onChange}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput
              placeholder='Last name'
              label='Last name'
              withAsterisk
              name='lastName'
              value={lastName}
              onChange={onChange}
            />
          </Grid.Col>
        </Grid>
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
        <TextInput
          placeholder='Confirm Password'
          label='Confirm Password'
          withAsterisk
          type='password'
          name='confirmPassword'
          value={confirmPassword}
          onChange={onChange}
        />
        <FileInput
          placeholder='Select an image'
          label='Profile Picture'
          withAsterisk
          name='profilePic'
          value={handleImage}
          onChange={setHandleImage}
          accept='image/png,image/jpeg'
        />
        <Button onClick={handleSignup} loading={loading}>
          Sign up
        </Button>
        <Button variant='outline'>Already have an account?</Button>
      </Stack>
    </Container>
  )
}

export default Signup
