import React from 'react'
import Addnote from './Addnote'
import Notes from './Notes'
const Home = () => {
  return (
    <div>
        <Addnote/>
        <h1>Your notes</h1>
        <Notes/>
    </div>
  )
}
export default Home
