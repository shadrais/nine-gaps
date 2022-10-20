import React from 'react'
import {
  Container,
  Grid,
  Anchor,
  Title,
  Button,
  useMantineTheme,
  Switch,
  useMantineColorScheme,
  ActionIcon,
} from '@mantine/core'
import { Link, useNavigate } from 'react-router-dom'
import { IconSun, IconMoonStars } from '@tabler/icons'
import useUserContext from '../context/userContext'
const Navbar = () => {
  const { user, logOut } = useUserContext()
  const theme = useMantineTheme()
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const navigate = useNavigate()
  const handleLogout = () => {
    logOut()
    navigate('/login')
  }
  const dark = colorScheme === 'dark'

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
        <Grid justify='space-around' align='center'>
          <Grid.Col span='content'>
            <ActionIcon
              variant='outline'
              color={dark ? 'yellow' : 'blue'}
              size='lg'
              onClick={() => toggleColorScheme()}
              title='Toggle color scheme'>
              {dark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
            </ActionIcon>
          </Grid.Col>
          {!user ? (
            <>
              {' '}
              <Grid.Col span='content'>
                <Link to='/login'>
                  <Button variant='outline'>Login</Button>
                </Link>
              </Grid.Col>
              <Grid.Col span='content'>
                <Link to='/signup'>
                  <Button>Sign Up</Button>
                </Link>
              </Grid.Col>
            </>
          ) : (
            <>
              {' '}
              <Grid.Col span='content'>
                <Link to='/dashboard'>
                  <Button>Dashboard</Button>
                </Link>
              </Grid.Col>
              <Grid.Col span='content'>
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
