import React, {useState} from 'react'

export default function FormEditArray({array, closeFromEditArray, updateArray}) {

    const [titleArray, setTitleArray] = useState(array.title)

  return (
    <div className="container-form" onClick={()=>{
        closeFromEditArray()
    }}>
        <form className="forms d-flex flex-column" onSubmit={(e)=>{
            e.preventDefault()
            updateArray(array.id, titleArray)
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
