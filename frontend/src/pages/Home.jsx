import React from 'react'
import { Container, Center, Title } from '@mantine/core'

const Home = () => {
  return (
    <Container
      fluid
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}>
      <Center>
        <Title color='white'>Welcome to Nine Gap</Title>
      </Center>
    </Container>
  )
}

export default Home
