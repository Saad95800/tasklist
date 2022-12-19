import React from 'react'
import { hideMessage } from '../redux/message/MessageSlice'
import { store } from '../redux/store'

export default function Message({texte, typeMessage}) {
  return (
    <div className={`d-flex justify-content-between ${typeMessage !== '' ? (typeMessage==='success' ? 'bg-success' : 'bg-danger') : ''}`}
         style={{height: '50px', width: '100%', position: 'fixed', top: '0px', left: '0px', padding: '10px' }}>
        <p style={{color: 'white', fontWeight: 'bold'}}>{texte}</p>
        <button type="button" className="btn-close" aria-label="Close" onClick={()=>{
                store.dispatch(hideMessage())
            }}></button> 
    </div>
  )
}
