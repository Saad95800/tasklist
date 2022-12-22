import React from 'react'
import { Link } from 'react-router-dom'
import { setSpacesToDelete, setSpaceToEdit, setViewFormEditSpace, setContextSpace, deleteSpace } from '../../redux/space/SpaceSlice'
import { deleteArrays } from '../../redux/array/ArraySlice'
import { store } from '../../redux/store'
import EditIcon from '@mui/icons-material/Edit';
import { useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import Checkbox from '@mui/material/Checkbox'

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function SpaceItem({space}) {

  const color = useSelector(state => state.space.color)
  const spacesToDelete = useSelector(state => state.space.spacesToDelete)

  return (

    <Box sx={{ minWidth: 275}} style={{width: '18rem'}} >
      <Card variant="outlined" style={{backgroundColor: space.color}}>
        <React.Fragment>
          <CardContent class="position-relative">
            <EditIcon  style={{top: '0px', right: '0px'}} className="position-absolute" onClick={()=>{
              store.dispatch(setContextSpace('edit'))
              store.dispatch(setViewFormEditSpace(true))
              store.dispatch(setSpaceToEdit(space))
            }} />
            <CloseIcon onClick={()=>{
              store.dispatch(deleteSpace(space.id))
              store.dispatch(deleteArrays(space.id))
            }}/>
            <Checkbox checked={spacesToDelete.indexOf(space.id) !== -1} onClick={()=>{
              store.dispatch(setSpacesToDelete(space.id))
            }}/>
            <Typography variant="h7" component="div" className="mt-3">
              {space.title}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">
              <Link to={`/tasklist/${space.id}`}>
                  Tableaux
              </Link>
            </Button>
          </CardActions>
        </React.Fragment>
      </Card>

    </Box>
  )
}
