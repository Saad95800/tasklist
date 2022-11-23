import React, {useState} from 'react'

export default function FormSup({arrays, deleteTable}){

    const [idArray, setIdArray] = useState(1)

    return (
        <form onSubmit={(e)=>{
            e.preventDefault()
            deleteTable(idArray)
        }}>
            <div className="form-group">
                <label>Supprimer un tableau</label>
                <select value={idArray} onChange={(e)=>{
                    setIdArray(e.target.value)
                }}>
                    {arrays.map((array, index)=>{
                        return <option key={index} value={array.id}>{array.title}</option>
                    })}
                </select>
            <div className="form-group">
                <input type="submit" className="btn btn-danger" value="Supprimer"/>
            </div>
        </div>
        </form>
    )
}