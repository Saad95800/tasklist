import React from 'react'
import { Link } from 'react-router-dom'

export default function SpaceItem({space}) {
  return (
    <div to={`/tasklist/${space.id}`} className="card ms-2 me-2 mt-1" style={{width: '18rem'}}>
        
        <div className="card-body">
            <h5 className="card-title">{space.title}</h5>
        </div>
        <link></link>
    </div>
  )
}
