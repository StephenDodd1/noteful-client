import React, { Component } from 'react';
import NotePageNav from '../NotePageNav/NotePageNav'

export default class AddNote extends Component {
   state = {};

   handleCreateNote = (e) => {
      e.preventDefault();
      const { noteFolder, noteName, noteContent } = this.state;
      if ( noteName ===' ') {
         for(let i = 0; i < 100; i++) {
            if(this.props.notes[i].name === `newNote${i}`){
               continue;
            }
            if (!this.props.notes[`newNote${i}`]) {
               console.log(`newNote${i}`)
               this.setState({
                  noteName: `newNote${i}`
               })
            }
         }
      }
      this.props.handleNoteSubmit(noteFolder, noteName, noteContent);
   }
   componentDidMount() {
      fetch()
   }
   onFolderSelect = ({target}) => {
      const { value: noteFolder } = target;
      this.setState({
         noteFolder
      })
   }

   onNoteNameChange = ({target}) => {
      const { value: noteName } = target;
      this.setState({
         noteName
      })
   }

   onNoteContentChange = ({target}) => {
      const { value: noteContent } = target;
      this.setState({
         noteContent
      })
   }

   render() {
      //const options = a map function to get folder names
      return(
         <div className='note-page-container'>
            <NotePageNav />
            <form  onSubmit = {e => this.handleCreateNote(e) }>
               <select name='noteFolder' onChange={e => this.onFolderSelect(e)}>
                  <option value='ABCDEFG' >ABCDEFG</option>
                  <option value='A'>A</option>
                  {/*options*/}
               </select>
               <input 
                  id='note-name-input' 
                  type='text' 
                  name='noteName'
                  onChange={e => this.onNoteNameChange(e)}
                  required
               />

               <input 
                  id='note-content-input' 
                  type='text' 
                  name='noteContent'
                  onChange={e => this.onNoteContentChange(e)}
                  required
               />
               <button type='submit'>
                  Submit
               </button>
            </form>
         </div>
      )
   }
}