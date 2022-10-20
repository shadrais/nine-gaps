import {
  Avatar,
  Button,
  Card,
  Center,
  Container,
  Grid,
  Group,
  Stack,
  Switch,
  Text,
  TextInput,
  Title,
} from '@mantine/core'
import { Buffer } from 'buffer'
import axios from 'axios'

import React, { useState } from 'react'
import { useEffect } from 'react'
import useUserContext from '../context/userContext'
import { Image } from '@mantine/core'
import toast from 'react-hot-toast'

const Dashboard = () => {
  const [user, setUser] = useState(null)
  const [image, setImage] = useState(null)
  const [togglePassword, setTogglePassword] = useState(false)
  const [form, setForm] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
  })
  const [toggle, setToggle] = useState(false)
  const { sendRequest, logIn } = useUserContext()

  useEffect(() => {
    const getUser = async () => {
      const res = await sendRequest('http://localhost:3000/v1/me', 'get')
      setUser(res)
      const base64String = await new Buffer.from(res.profilePicture).toString(
        'base64'
      )
      setImage(base64String)
    }
    getUser()
  }, [])

  const handleToggle = () => {
    setForm({
      firstName: user.firstName,
      lastName: user.lastName,
    })
    setToggle(!toggle)
  }

  const handleFormData = (e) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleUpdate = async () => {
    if (
      form.firstName === user.firstName &&
      form.lastName === user.lastName &&
      !togglePassword
    ) {
      return
    }
    if (togglePassword) {
      if (form.oldPassword === form.newPassword) {
        toast.error('Old password and new password cannot be same')
        return
      }
      if (!form.oldPassword || !form.newPassword) {
        toast.error('Please enter both old and new password')
        return
      }
    }
    const newObj = {}
    Object.entries(form).map(([key, value]) => {
      if (
        value !== user[key] &&
        value !== '' &&
        value !== null &&
        value.length > 0
      ) {
        newObj[key] = value
      }
    })

    const res = await sendRequest(
      'http://localhost:3000/v1/update',
      'post',
      newObj
    )
    if (res.success) {
      setUser(res)
      setToggle(!toggle)
      setTogglePassword(false)
      logIn(res)
      toast.success('Profile updated successfully')
    }
  }

  return (
    <Container size={400}>
      <Center mb={16}>
        <Title color='white'>Dashboard</Title>
      </Center>
      <Card shadow='sm' radius='md' withBorder>
        <Card.Section p='md'>
          <Center>
            <Image
              src={`data:image/png;base64,${image}`}
              alt='profile image'
              height={100}
              width={100}
              radius='lg'
            />
          </Center>
        </Card.Section>
        <Grid gutter={24}>
          <Grid.Col>
            <Grid>
              <Grid.Col span={4}>
                <Title order={4}>First Name:</Title>
              </Grid.Col>
              <Grid.Col span='content'>
                {!toggle ? (
                  <Text>{user?.firstName}</Text>
                ) : (
                  <TextInput
                    value={form.firstName}
                    onChange={handleFormData}
                    name='firstName'
                  />
                )}
              </Grid.Col>
            </Grid>
          </Grid.Col>
          <Grid.Col>
            <Grid>
              <Grid.Col span={4}>
                <Title order={4}>Last Name:</Title>
              </Grid.Col>
              <Grid.Col span='content'>
                {!toggle ? (
                  <Text>{user?.lastName}</Text>
                ) : (
                  <TextInput
                    value={form.lastName}
                    name='lastName'
                    onChange={handleFormData}
                  />
                )}
              </Grid.Col>
            </Grid>
          </Grid.Col>
          <Grid.Col>
            <Grid>
              <Grid.Col span={4}>
                <Title order={4}>Email ID:</Title>
              </Grid.Col>
              <Grid.Col span='content'>
                {!toggle ? (
                  <Text>{user?.email}</Text>
                ) : (
                  <TextInput
                    value={user?.email}
                    name='lastName'
                    onChange={handleFormData}
                    disabled
                  />
                )}
              </Grid.Col>
            </Grid>
          </Grid.Col>
          {toggle && (
            <Grid.Col>
              <Grid>
                <Grid.Col span={6}>
                  <Title order={4}>Change Password</Title>
                </Grid.Col>
                <Grid.Col span='content'>
                  <Switch
                    checked={togglePassword}
                    onChange={() => setTogglePassword(!togglePassword)}
                  />
                </Grid.Col>
              </Grid>
            </Grid.Col>
          )}
          {togglePassword && (
            <>
              <Grid.Col>
                <Grid>
                  <Grid.Col span={5}>
                    <Title order={5}>Old Password</Title>
                  </Grid.Col>
                  <Grid.Col span='auto'>
                    <TextInput
                      type='password'
                      onChange={handleFormData}
                      name='oldPassword'
                    />
                  </Grid.Col>
                </Grid>
              </Grid.Col>
              <Grid.Col>
                <Grid>
                  <Grid.Col span={5}>
                    <Title order={5}>New Password</Title>
                  </Grid.Col>
                  <Grid.Col span='auto'>
                    <TextInput
                      type='password'
                      onChange={handleFormData}
                      name='newPassword'
                    />
                  </Grid.Col>
                </Grid>
              </Grid.Col>
            </>
          )}
        </Grid>

        {!toggle ? (
          <Center mt={24}>
            {' '}
            <Button fullWidth onClick={handleToggle}>
              Update Profile
            </Button>{' '}
          </Center>
        ) : (
          <Group position='center' grow mt={12}>
            <Button variant='outline' onClick={handleToggle}>
              Cancel
            </Button>
            <Button onClick={handleUpdate}>Save</Button>
          </Group>
        )}
      </Card>
    </Container>
  )
}

export default Dashboard
