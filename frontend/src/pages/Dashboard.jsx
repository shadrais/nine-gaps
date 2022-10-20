import {
  Avatar,
  Center,
  Container,
  Grid,
  Stack,
  Text,
  Title,
} from '@mantine/core'
import { Buffer } from 'buffer'
import axios from 'axios'

import React, { useState } from 'react'
import { useEffect } from 'react'
import useUserContext from '../context/userContext'
import { Image } from '@mantine/core'

const Dashboard = () => {
  const [user, setUser] = useState(null)
  const [image, setImage] = useState(null)
  const { sendRequest } = useUserContext()

  useEffect(() => {
    const getUser = async () => {
      const res = await sendRequest('http://localhost:3000/v1/me', 'get')
      console.log(res.profilePicture)
      setUser(res)
      const base64String = await new Buffer.from(res.profilePicture).toString(
        'base64'
      )

      setImage(base64String)
    }
    getUser()
  }, [])

  return (
    <Container size={400}>
      <Stack>
        <Center>
          <Title color='white'>Dashboard</Title>
        </Center>
        <Image
          src={`data:image/png;base64,${image}`}
          alt='profile image'
          height={100}
          width={100}
          // src='https://images.unsplash.com/photo-1511216335778-7cb8f49fa7a3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80'
        />
        <Title order={3} color='white'>
          First Name: {user?.firstName}
        </Title>
        <Title order={3} color='white'>
          Last Name: {user?.lastName}
        </Title>
        <Title order={3} color='white'>
          Email: {user?.email}
        </Title>
      </Stack>
    </Container>
  )
}

export default Dashboard
