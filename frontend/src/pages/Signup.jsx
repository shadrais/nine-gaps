import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  Center,
  Title,
  Grid,
  Stack,
  TextInput,
  FileInput,
  Button,
} from '@mantine/core'
import useUserContext from '../context/userContext'
import { IconBrandFacebook, IconBrandGoogle } from '@tabler/icons'
const Signup = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const { sendRequest, user } = useUserContext()
  const [handleImage, setHandleImage] = useState(null)
  const { firstName, lastName, email, password, confirmPassword } = formData

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/dashboard')
    }
  }, [])
  const handleSignup = async () => {
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return toast.error('Please fill all the required fields')
    }
    if (password !== confirmPassword) {
      return toast.error('Passwords do not match')
    }

    const data = new FormData()
    data.append('firstName', firstName)
    data.append('lastName', lastName)
    data.append('email', email)
    data.append('password', password)
    data.append('confirmPassword', confirmPassword)
    data.append('profilePicture', handleImage)
    const res = await sendRequest('/signup', 'post', data, 'form')
    if (res?.success) {
      localStorage.setItem('token', res.token)
      navigate('/dashboard')
    }
  }

  return (
    <Container size={450}>
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
        <Button onClick={handleSignup}>Sign up</Button>
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
        <Button variant='outline' onClick={() => navigate('/login')}>
          Already have an account?
        </Button>
      </Stack>
    </Container>
  )
}

export default Signup
