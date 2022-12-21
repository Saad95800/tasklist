import React, {useEffect} from 'react'
import { useSelector } from 'react-redux';
import { setTitle, updateSpace, setViewFormEditSpace, addSpace, setColor } from '../../redux/space/SpaceSlice'
import { store } from '../../redux/store'
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';

export default function FormEditSpace() {

    const title = useSelector(state => state.space.title)
    const spaceToEdit = useSelector(state => state.space.spaceToEdit)
    const contextSpace = useSelector(state => state.space.contextSpace)
    const color = useSelector(state => state.space.color)

    useEffect(() => {
        if(contextSpace === 'edit') store.dispatch(setTitle(spaceToEdit.title))
        return ()=>{
            // Ce code s'éxécute lorsque le composant disparait
            store.dispatch(setTitle(''))
            store.dispatch(setColor('#ffffff'))
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
                    id_space: spaceToEdit.id,
                    color: color
                }))                
            }else{
                store.dispatch(addSpace({
                    title_space: title,
                    color: color
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
            <label htmlFor="color" className="form-label">Couleur</label>
            <input type="color" className="form-control form-control-color" id="color" value={color} title="Choississez la couleur"
                onChange={(e)=>{
                    store.dispatch(setColor(e.target.value))
                }} />
            <div className="form-group">
                <button className="btn btn-success" type="submit">
                    {contextSpace === 'edit' ? 'Enregistrer' : 'Ajouter'}
                </button>
            </div>
        </form>
    </div>
  )
}
