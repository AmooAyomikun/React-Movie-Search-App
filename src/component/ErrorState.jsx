import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'

const ErrorState = ({message}) => {
  return (
    <div className='error'>
      <FontAwesomeIcon className='error-icon' icon={faTriangleExclamation} />
      <p>{message}</p>
    </div>
  )
}

export default ErrorState