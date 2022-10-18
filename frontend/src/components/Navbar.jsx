import React from 'react'
import { Container, Grid, Anchor, Title, Button } from '@mantine/core'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <Container py={24} fluid style={{ backgroundColor: 'wheat' }} px={48}>
      <Grid justify='space-between'>
        <Grid>
          <Grid.Col>
            <Link to='/'>
              <Title color='dimmed'>Nine GAP</Title>
            </Link>
          </Grid.Col>
        </Grid>
        <Grid justify='space-around'>
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
        </Grid>
      </Grid>
    </Container>
  )
}

export default Navbar
