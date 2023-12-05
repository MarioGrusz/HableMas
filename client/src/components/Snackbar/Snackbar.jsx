import './index.scss'  
import React, { useEffect } from 'react'
import { UserAuth } from '../../context/AuthContext';

function Snackbar() {

  const { snackbar, hideSnackbar } = UserAuth();
  useEffect(() => {
    if (snackbar.show) {
      const timer = setTimeout(() => {
        hideSnackbar();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [snackbar, hideSnackbar]);


  return (
    <div className={`snackbar ${snackbar.show ? 'show' : 'hide'}`}
  
    style={{ 
       backgroundColor: snackbar.type === "success" ? "#00F593" : "#FF0033",
       color: snackbar.type === "success" ? "black" : "white",
      }} 
    >
      <div className='snackbar__symbol'>{snackbar.type === 'success' ? <h1>&#x2713;</h1> : <h1>&#x2613;</h1>}</div>
      <div className='snackbar__message'>{snackbar.message}</div>
    </div>
  )
}

export default Snackbar