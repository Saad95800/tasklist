import React, {useEffect} from 'react'
import { useSelector } from 'react-redux';
import { setTitle } from '../../redux/space/SpaceSlice'
import { store } from '../../redux/store'

export default function FormEditSpace() {

    const title = useSelector(state => state.space.title)
    const spaceToEdit = useSelector(state => state.space.spaceToEdit)

    useEffect(() => {
        store.dispatch(setTitle(spaceToEdit.title))
    }, [spaceToEdit]);

  return (
    <div>
        <form onSubmit={(e)=>{
            e.preventDefault()
            // Code de modification du space
            // title
        }}>
            <input type="text" value={title} onChange={(e)=>{
                store.dispatch(setTitle(e.target.value))
            }}/>
            <button type="submit">Enregistrer</button>
        </form>
    </div>
  )
}
