import React, { useState } from "react";
import noteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const authToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxNDVlZDkzOWY5ZjY4MWZiNDcyOGFkIn0sImlhdCI6MTY3OTIwNTY1Nn0.eU7n2afIZMKqTEe4zS05U1fGzIdIL6ljjF6qvUs0_WM"
  const InitialNotes = []
  const [notes, setNotes] = useState(InitialNotes)

  const getAllNotes = async() => {
    // API call
    const response = await fetch(`${host}/api/notes/fetchAllNotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":authToken
      }
    });
    const json=await response.json()
    setNotes(json) 
  }
  const addNote = async(title, description, tag) => {
    // API call
    const response =await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":authToken
      },
      body: JSON.stringify({title,description,tag})
    });
    if(response.status===400){
      window.alert("Can not add empty note")
    }
    getAllNotes();
  }
  const deleteNote = async(id) => {
    // API call
    await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":authToken
      },
      // body: JSON.stringify({title,description,tag})
    });
    //client call
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes);
  }
  const editNote = async (id, title, description, tag) => {
    // API call
    const response=await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":authToken
      },
      body: JSON.stringify({title,description,tag}),
    });
    //client side update
    if(response.status!==400){
      let newNotes=JSON.parse(JSON.stringify(notes))
      for (let index = 0; index < newNotes.length; index++) {
        if (id === newNotes[index]._id) {
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          break;
        }
      }
      // eslint-disable-next-line
      const json=response.json();
      setNotes(newNotes)
    }
  }
  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote ,getAllNotes}}>
      {props.children}
    </noteContext.Provider>
  )
}
export default NoteState