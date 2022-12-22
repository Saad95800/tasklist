import React from 'react'
import { useSelector } from 'react-redux'
import SpaceItem from '../component/space/SpaceItem'
import FormEditSpace from '../component/space/FormEditSpace'
import { store } from '../redux/store'
import { setContextSpace, setViewFormEditSpace, deleteSpacesSelected } from '../redux/space/SpaceSlice'
import { deleteArraysSpacesSelected } from '../redux/array/ArraySlice'

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
        }}>Supprimer en masse</div>
        <div className="d-flex flex-wrap">
            {spaces.map((space, index)=>{
                return <SpaceItem key={index} space={space} />
            })}
            {viewFormEditSpace && <FormEditSpace />}
        </div>

    </>
  )
}
