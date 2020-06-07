import React, { Component } from 'react';
import NotePageNav from '../NotePageNav/NotePageNav';
import ValidationError from '../ValidationError/ValidationError';
import PropTypes from 'prop-types'

export default class AddNote extends Component {
   state = {
      noteName: ''
   };

   handleCreateNote = (e) => {
      e.preventDefault();
      const appNotes = this.props.state.notes;
      const { noteName, noteContent, folderId } = this.state;
      for(let i = 0; i < appNotes.length; i++) {
         if(noteName === appNotes[i].name) {
         return (alert('There is already a folder with this name.'))}
         }
      this.props.handleNoteSubmit( noteName, noteContent, folderId );
   }
   
   onFolderSelect = ({target}) => {
      const { value: folderId } = target;
      this.setState({
         folderId
      })
   }

   onNoteNameChange = ({target}) => {
      const { value: noteName } = target;
      this.validateName()
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

   validateName() {
      const name = this.state.noteName;
      if (name.length === 0) {
        return 'Name is required';
      } else if (name.length < 3) {
        return 'Name must be at least 3 characters long';
      }
   }

   render() {
      const folderList = this.props.state.folders;
      const folderArr = folderList.map((folder) => <option value={(folder.id).toString()} name={folder.id.toString()} id={folder.id.toString()}>{folder.name}</option>)
      console.log(folderArr);
      return(
         <div className='note-page-container'>
            <NotePageNav />
            <form  onSubmit = {e => this.handleCreateNote(e) }>
               <select name='folderId' onChange={e => this.onFolderSelect(e)} required >
                  <option value='select a folder...' >Select a folder...</option>
                  {folderArr}
               </select>
               <label htmlFor='noteName'>Note Name</label>
               <input 
                  id='note-name-input' 
                  type='text' 
                  name='noteName'
                  onChange={e => this.onNoteNameChange(e)}
                  required
               />
               <ValidationError message={this.validateName()}/>
               <label htmlFor='noteContent'><br/>Content</label>
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

AddNote.propTypes = {
   state: PropTypes.object
}