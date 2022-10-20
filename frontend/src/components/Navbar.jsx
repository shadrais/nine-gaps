import React from 'react'
import { Container, Grid, Anchor, Title, Button } from '@mantine/core'
import { Link, useNavigate } from 'react-router-dom'
import useUserContext from '../context/userContext'
const Navbar = () => {
  const { user, logOut } = useUserContext()
  const navigate = useNavigate()
  const handleLogout = () => {
    logOut()
    navigate('/login')
  }

  return (
    <Container
      py={24}
      mb={24}
      fluid
      style={{
        borderBottom: '1px solid rgb(20, 21, 23)',
        backgroundColor: 'rgb(20, 21, 23)',
      }}
      px={48}>
      <Grid justify='space-between'>
        <Grid>
          <Grid.Col>
            <Link to='/'>
              <Title color='white'>Nine GAP</Title>
            </Link>
          </Grid.Col>
        </Grid>
        <Grid justify='space-around'>
          {!user ? (
            <>
              {' '}
              <Grid.Col span={4}>
                <Link to='/login'>
                  <Button variant='outline'>Login</Button>
                </Link>
              </Grid.Col>
              <Grid.Col span={4}>
                <Link to='/signup'>
                  <Button>Sign UP</Button>
                </Link>
              </Grid.Col>
            </>
          ) : (
            <>
              {' '}
              <Grid.Col span={6}>
                <Link to='/dashboard'>
                  <Button>Dashboard</Button>
                </Link>
              </Grid.Col>
              <Grid.Col span={4}>
                <Button variant='outline' onClick={handleLogout}>
                  Logout
                </Button>
              </Grid.Col>
            </>
          )}
        </Grid>
      </Grid>
    </Container>
  )
}

export default Navbar
