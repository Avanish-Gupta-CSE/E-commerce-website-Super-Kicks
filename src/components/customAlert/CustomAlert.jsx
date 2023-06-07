import React from 'react';
import "./CustomAlert.css";

export const CustomAlert = ({message}) => {
  return (
    message && <div className='alert'>{message}</div>
  )
}
