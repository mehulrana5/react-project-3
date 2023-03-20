import React, { useContext, useEffect,useRef,useState} from 'react' 
import noteContext from '../context/notes/NoteContext';
import Noteitem from './Noteitem';
const Notes = () => {
  const context = useContext(noteContext)
  const { notes, getAllNotes,editNote} = context;
  useEffect(() => {
    getAllNotes();
    // eslint-disable-next-line
  }, [])
  const ref=useRef(null)
  const ref_close=useRef(null)
  const [note,setNote]=useState({eid:"",etitle:"",edescription:"",etag:""})
  const updatebtn=(cur_note)=>{
    ref.current.click();
    setNote({eid:cur_note._id,etitle:cur_note.title,edescription:cur_note.description,etag:cur_note.tag})
  } 
  const update_notes=(e)=>{
    editNote(note.eid,note.etitle,note.edescription,note.etag)
    ref_close.current.click();
  }
  const onchange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value})
  }
  return (
    <div>
      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={updatebtn}>
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">       
              <h1 className="modal-title fs-5" id="exampleModalLabel">Update Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={ref_close}></button>
            </div>
            <div className="modal-body">
              <div className="container my-4">
                <form>
                    <div className="mb-3">
                        <label htmlFor="etitle" className="form-label">Title</label>
                        <input type="Text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={onchange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="edescription" className="form-label">Description</label>
                        <textarea className="form-control" name="edescription" id="edescription" rows="3" value={note.edescription} onChange={onchange} ></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="etag" className="form-label">Tag</label>
                        <input className="form-control" type="text" id='etag' name='etag' value={note.etag} onChange={onchange} ></input>
                    </div>
                </form>
            </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={update_notes}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex flex-wrap">
        {notes.map((note) => {
          return <Noteitem key={note._id} note={note} updatebtn={updatebtn}/>
        })}
      </div>
    </div>
  )
}

export default Notes
