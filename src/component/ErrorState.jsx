import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'

const ErrorState = () => {
  return (
    <div className='error'>
      <FontAwesomeIcon className='error-icon' icon={faTriangleExclamation} />
    </div>
  )
}

export default ErrorState