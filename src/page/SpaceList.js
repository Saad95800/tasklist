import React from 'react'
import { useSelector } from 'react-redux'
import SpaceItem from '../component/space/SpaceItem'
import FormEditSpace from '../component/space/FormEditSpace'

export default function SpaceList() {

    const spaces = useSelector((state)=>state.space.spaces)
    const viewFormEditSpace = useSelector((state)=>state.space.viewFormEditSpace)
  return (
    <>
        <h2>SpaceList</h2>
        <div className="d-flex flex-wrap">
            {spaces.map((space, index)=>{
                return <SpaceItem key={index} space={space} />
            })}
            {viewFormEditSpace && <FormEditSpace />}
        </div>

    </>
  )
}
