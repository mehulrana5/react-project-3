import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/NoteContext';
const Addnote = () => {
    const context=useContext(noteContext);
    const {addNote}=context
    const [note,setNote]=useState({title:"",description:"",tag:""})
    const submitnote=(e)=>{
        e.preventDefault()
        addNote(note.title,note.description,note.tag)
        setNote({title:"",description:"",tag:""})
    }
    const onchange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
    return (
        <div>
            <div className="container my-4">
                <form>
                    <h1>Add a note</h1>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title*</label>
                        <input type="Text" className="form-control" id="title" name="title" value={note.title} onChange={onchange} minLength={3} placeholder={"mininum 3 char"} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description*</label>
                        <textarea className="form-control" name="description" id="description" rows="3" value={note.description} onChange={onchange} minLength={5} placeholder={"mininum 5 char"} required></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="note_tag" className="form-label">Tag*</label>
                        <input className="form-control" value={note.tag} type="text" id='note_tag' name='tag' onChange={onchange}></input>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={submitnote}
                    disabled={note.title.length<3 || note.description.length<5}>Add note</button>
                </form>
            </div>
        </div>
    )
}
export default Addnote
