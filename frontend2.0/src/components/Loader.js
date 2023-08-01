import React from 'react'
import { Spinner } from 'react-bootstrap'
export const Loader = ({ variant , size }) => {
  const customStyle={
    height: size==='small' ? '30px': '150px',
    width: size==='small' ? '30px': '150px',
    margin:'auto',
    display:'block'
  }
  return (
    <Spinner 
        animation='border'
        role='status'
        style={customStyle}
        variant={variant ? variant : "primary" }
    >
        <span className='sr-only'>Loading...</span>
    </Spinner>
  )
}
