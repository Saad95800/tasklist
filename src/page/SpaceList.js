import React from 'react'
import { useSelector } from 'react-redux'
import SpaceItem from '../component/SpaceItem'

export default function SpaceList() {

    const spaces = useSelector((state)=>state.space.spaces)

  return (
    <>
        <h2>SpaceList</h2>
        <div className="d-flex flex-wrap">
            {spaces.map((space, index)=>{
                return <SpaceItem key={index} space={space} />
            })}
        </div>

    </>
  )
}
