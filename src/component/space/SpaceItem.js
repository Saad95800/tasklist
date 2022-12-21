import React from 'react'
import { Link } from 'react-router-dom'
import { setSpaceToEdit, setViewFormEditSpace } from '../../redux/space/SpaceSlice'
import { store } from '../../redux/store'
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';

export default function SpaceItem({space}) {
  return (
    <div className="card ms-2 me-2 mt-1" style={{width: '18rem'}}>
       <Box>
        <button  style={{top: '0px', right: '0px'}} className="position-absolute" onClick={()=>{
            store.dispatch(setViewFormEditSpace(true))
            store.dispatch(setSpaceToEdit(space))
          }}>Edit</button>
        </Box>
        <div className="card-body">
            <h5 className="card-title">{space.title}</h5>
        </div>
        <Link to={`/tasklist/${space.id}`} className="btn btn-primary">
            Tableaux
        </Link>
    </div>
  )
}
