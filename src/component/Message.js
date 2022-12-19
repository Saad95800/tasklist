import React from 'react'

export default function Message({texte, typeMessage, hideMessage}) {
  return (
    <div className={`d-flex justify-content-between ${typeMessage !== '' ? (typeMessage==='success' ? 'bg-success' : 'bg-danger') : ''}`}
         style={{height: '50px', width: '100%', position: 'fixed', top: '0px', left: '0px', padding: '10px' }}>
        <p style={{color: 'white', fontWeight: 'bold'}}>{texte}</p>
        <button type="button" className="btn-close" aria-label="Close" onClick={()=>{
                hideMessage()
            }}></button> 
    </div>
  )
}
