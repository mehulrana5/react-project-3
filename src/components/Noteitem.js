import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import noteContext from '../context/notes/NoteContext'
const Noteitem = (props) => {
    const { note,updatebtn } = props
    const context = useContext(noteContext)
    const { deleteNote } = context  
    const delNote=(id)=>{
        if(window.confirm("You want to delete this node?")){
            deleteNote(note._id);
        }
    }
    return (
        <div>
            <div className="card my-4 mx-3" style={{ width: "18rem" }}>
                <div className="card-body">
                    <div className="d-flex">
                        <h5 className="card-title">{note.title}</h5>
                        <FontAwesomeIcon icon={faTrash} className="mx-2 pointer" onClick={() =>{ 
                            delNote(note._id)}
                        }/>
                        <FontAwesomeIcon icon={faPenToSquare} className="mx-2 pointer" onClick={()=>{updatebtn(note)}}/>
                    </div>
                    <h6 className="card-subtitle mb-2 text-muted">{note.description}</h6>
                </div>
            </div>
        </div>
    )
}
export default Noteitem
