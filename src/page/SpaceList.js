import React from 'react'
import { useSelector } from 'react-redux'
import SpaceItem from '../component/space/SpaceItem'
import FormEditSpace from '../component/space/FormEditSpace'
import { store } from '../redux/store'
import { setContextSpace, setViewFormEditSpace } from '../redux/space/SpaceSlice'

export default function SpaceList() {

    const spaces = useSelector((state)=>state.space.spaces)
    const viewFormEditSpace = useSelector((state)=>state.space.viewFormEditSpace)
    
  return (
    <>
        <h2>SpaceList</h2>
        <div className="btn btn-primary" onClick={()=>{
            store.dispatch(setContextSpace('add'))
            store.dispatch(setViewFormEditSpace(true))
        }}>Ajouter</div>
        <div className="d-flex flex-wrap">
            {spaces.map((space, index)=>{
                return <SpaceItem key={index} space={space} />
            })}
            {viewFormEditSpace && <FormEditSpace />}
        </div>

    </>
  )
}
