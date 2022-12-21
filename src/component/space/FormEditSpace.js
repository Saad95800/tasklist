import React, {useEffect} from 'react'
import { useSelector } from 'react-redux';
import { setTitle, updateSpace, setViewFormEditSpace, addSpace } from '../../redux/space/SpaceSlice'
import { store } from '../../redux/store'
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';

export default function FormEditSpace() {

    const title = useSelector(state => state.space.title)
    const spaceToEdit = useSelector(state => state.space.spaceToEdit)
    const contextSpace = useSelector(state => state.space.contextSpace)

    useEffect(() => {
        if(contextSpace === 'edit') store.dispatch(setTitle(spaceToEdit.title))
        return ()=>{
            // Ce code s'éxécute lorsque le composant disparait
            store.dispatch(setTitle(''))
        }
    }, [spaceToEdit])

  return (
    <div className="container-form">
        <form className="forms" onSubmit={(e)=>{
            e.preventDefault()
            // Code de modification du space
            if(contextSpace === 'edit'){
                store.dispatch(updateSpace({
                    title_space: title,
                    id_space: spaceToEdit.id
                }))                
            }else{
                store.dispatch(addSpace({
                    title_space: title
                }))    
            }

        }}>
        
            <button onClick={()=>{
                store.dispatch(setViewFormEditSpace(false))
            }} >Fermer</button>
            <div className="form-group">
                <input className="form-control" type="text" value={title} onChange={(e)=>{
                    store.dispatch(setTitle(e.target.value))
                }}/>
            </div>
            <div className="form-group">
                <button className="btn btn-success" type="submit">
                    {contextSpace === 'edit' ? 'Enregistrer' : 'Ajouter'}
                </button>
            </div>
        </form>
    </div>
  )
}
