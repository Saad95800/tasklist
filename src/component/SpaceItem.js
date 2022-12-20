import React from 'react'

export default function SpaceItem({space}) {
  return (
    <div className="card ms-2 me-2 mt-1" style={{width: '18rem'}}>
        <div className="card-body">
            <h5 className="card-title">{space.title}</h5>
        </div>
    </div>
  )
}
