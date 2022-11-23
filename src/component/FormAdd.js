import React, {useState} from 'react'

export default function FormAdd({addTable}){

    const [title, setTile] = useState('')

    return(
        <form onSubmit={(e)=>{
            e.preventDefault()
            if(title.length > 0){
                addTable(title)
            }else{
                alert('Veuillez saisir un titre de tableau')
            }
        }}>
            <div className="form-group">
                <label>Ajouter un tableau</label>
                <input type="text" value={title} onChange={(e)=>{
                    setTile(e.target.value) 
                }} />
            <div className="form-group">
                <input type="submit" className="btn btn-primary" value="Ajouter"/>
            </div>
        </div>
        </form>
    )
}