import React from 'react'
import { setViewModalConfirm } from '../redux/message/MessageSlice'
import { store } from '../redux/store'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { styleModal } from '../utils/data'
import Button from '@mui/material/Button';

export default function PopinConfirmAction({message, action, params}) {
  return (
    <Modal
            open={true}
            onClose={()=>{store.dispatch(setViewModalConfirm(false))}}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
        <Box sx={styleModal}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
            {message}
        </Typography>

        <div>
        <Button variant="contained" onClick={()=>{
            action(...params)
            store.dispatch(setViewModalConfirm(false))
        }}>Confirmer</Button>
        <Button variant="outlined" onClick={()=>{
            store.dispatch(setViewModalConfirm(false))
        }}>Annuler</Button>
        </div>
        </Box>
    </Modal>
  )
}
