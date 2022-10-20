import React from 'react'
import { Loader } from '@mantine/core'
const Spinner = () => {
  return (
    <div
      style={{
        position: 'fixed',
        height: '100vh',
        width: '100vw',
        zIndex: 9999,

        backgroundColor: 'rgb(20, 21, 23)',
      }}>
      <Loader
        size={50}
        color='blue'
        style={{
          margin: 'auto',
          display: 'block',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </div>
  )
}

export default Spinner
