import React from 'react'
import { useSelector } from 'react-redux'
import SpaceItem from '../component/space/SpaceItem'
import FormEditSpace from '../component/space/FormEditSpace'
import { store } from '../redux/store'
import { setContextSpace, setViewFormEditSpace, deleteSpacesSelected } from '../redux/space/SpaceSlice'
import { deleteArraysSpacesSelected } from '../redux/array/ArraySlice'

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { displayMessage } from '../redux/message/MessageSlice'


export default function SpaceList() {

    const spaces = useSelector((state)=>state.space.spaces)
    const viewFormEditSpace = useSelector((state)=>state.space.viewFormEditSpace)
    const spacesToDelete = useSelector((state)=>state.space.spacesToDelete)
    
  return (
    <>
        <h2>SpaceList</h2>
        <div className="btn btn-primary" onClick={()=>{
            store.dispatch(setContextSpace('add'))
            store.dispatch(setViewFormEditSpace(true))
        }}>Ajouter</div>
        <div className="btn btn-danger" onClick={()=>{
            store.dispatch(deleteSpacesSelected())
            store.dispatch(deleteArraysSpacesSelected(spacesToDelete))
            store.dispatch(displayMessage({
                texte: "Suppression en masse effectuée avec succès !",
                typeMessage: 'success'
            }))
        }}>Supprimer en masse</div>
        
        <Box>
            <Grid container spacing={2}>
                {spaces.map((space, index)=>{
                    return <Grid xs={6} md={4}>
                                <SpaceItem key={index} space={space} />
                            </Grid>
                })}
            </Grid>
        </Box>

            {viewFormEditSpace && <FormEditSpace />}


    </>
  )
}
