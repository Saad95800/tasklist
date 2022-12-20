import React, {useState} from 'react'
import { updateArray } from '../redux/array/ArraySlice'
import { store } from '../redux/store'

export default function FormEditArray({array, closeFromEditArray}) {

    const [titleArray, setTitleArray] = useState(array.title)

  return (
    <div className="container-form" onClick={()=>{
        closeFromEditArray()
    }}>
        <form className="forms d-flex flex-column" onSubmit={(e)=>{
            e.preventDefault()
            store.dispatch(updateArray({
                id_array: array.id, 
                title_array: titleArray
            }))
        }}
        onClick={(e)=>{
            e.stopPropagation()
        }}>
            <div className="form-group">
                <label>Modifier une un tableau</label>
                <input type="text" className="form-control" value={titleArray} onChange={(e)=>{
                    setTitleArray(e.target.value) 
                }} />
            </div>
            <div className="form-group">
                <input type="submit" className="btn btn-primary" value="Modifier"/>
            </div>
        </form>
    </div>
  )
}
