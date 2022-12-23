import React from 'react'
import { hideMessage } from '../redux/message/MessageSlice'
import { store } from '../redux/store'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'

const Alert = React.forwardRef(function Alert(props, ref){
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export default function Message({texte, typeMessage}) {
  return (
    <div>
      <Snackbar
        anchorOrigin={{vertical: 'top', horizontal: 'center'}}
        open={true}
        sx={{width: '100%'}}>
        <Alert 
          onClose={()=>{ store.dispatch(hideMessage()) }}
          severity={`${typeMessage !== '' ? (typeMessage==='success' ? 'success' : 'error') : ''}`}
          sx={{width: '90%'}} >
          {texte}
        </Alert>
      </Snackbar>
    </div>
  )
}
