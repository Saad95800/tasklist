import React from 'react'
import { Link } from 'react-router-dom'
import { setSpacesToDelete, setSpaceToEdit, setViewFormEditSpace, setContextSpace, deleteSpace } from '../../redux/space/SpaceSlice'
import { deleteArrays } from '../../redux/array/ArraySlice'
import { store } from '../../redux/store'
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import Checkbox from '@mui/material/Checkbox'

export default function SpaceItem({space}) {

  const color = useSelector(state => state.space.color)
  const spacesToDelete = useSelector(state => state.space.spacesToDelete)

  return (
    <div className="card ms-2 me-2 mt-1" style={{width: '18rem', backgroundColor: space.color}}>
       <Box>
        <button  style={{top: '0px', right: '0px'}} className="position-absolute" onClick={()=>{
            store.dispatch(setContextSpace('edit'))
            store.dispatch(setViewFormEditSpace(true))
            store.dispatch(setSpaceToEdit(space))
          }}>Edit</button>
        </Box>
        <CloseIcon onClick={()=>{
          store.dispatch(deleteSpace(space.id))
          store.dispatch(deleteArrays(space.id))
        }}/>
        <Checkbox checked={spacesToDelete.indexOf(space.id) !== -1} onClick={()=>{
          store.dispatch(setSpacesToDelete(space.id))
        }}/>
        <div className="card-body">
            <h5 className="card-title">{space.title}</h5>
        </div>
        <Link to={`/tasklist/${space.id}`} className="btn btn-primary">
            Tableaux
        </Link>
    </div>
  )
}
