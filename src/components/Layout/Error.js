import React from 'react'
import classes from './Error.module.css'

function Error(props) {
  return (
    <div className={classes.ErrorContainer}>
      <p>{props.message}</p> 
      
    </div>
  )
}

export default Error
