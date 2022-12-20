import React, {useState} from 'react'
import { updateArray, setDisplayFormEditArray } from '../redux/array/ArraySlice'
import { displayMessage } from '../redux/message/MessageSlice'
import { store } from '../redux/store'

export default function FormEditArray({array, closeFromEditArray}) {

    const [titleArray, setTitleArray] = useState(array.title)

  return (
    <div className="container-form" onClick={()=>{
        closeFromEditArray()
    }}>
        <form className="forms d-flex flex-column" onSubmit={(e)=>{
            e.preventDefault()
            if(titleArray.length === 0){
                store.dispatch(displayMessage({texte:'Veuillez saisir un titre de tableau', typeMessage: 'error'}))
                store.dispatch(setDisplayFormEditArray(false))
                return
            }
            store.dispatch(updateArray({
                id_array: array.id, 
                title_array: titleArray
            }))
            store.dispatch(displayMessage({texte:'Tableau modifié avec succès !', typeMessage: 'success'}))
            store.dispatch(setDisplayFormEditArray(false))
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
