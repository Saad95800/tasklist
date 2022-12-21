import React from 'react'
import { Link } from 'react-router-dom'
import { setSpaceToEdit, setViewFormEditSpace } from '../../redux/space/SpaceSlice'
import { store } from '../../redux/store'

export default function SpaceItem({space}) {
  return (
    <div className="card ms-2 me-2 mt-1" style={{width: '18rem'}}>
        <button onClick={()=>{
            store.dispatch(setViewFormEditSpace(true))
            store.dispatch(setSpaceToEdit(space))
        }}>Edit</button>
        <div className="card-body">
            <h5 className="card-title">{space.title}</h5>
        </div>
        <Link to={`/tasklist/${space.id}`} className="btn btn-primary">
            Tableaux
        </Link>
    </div>
  )
}
