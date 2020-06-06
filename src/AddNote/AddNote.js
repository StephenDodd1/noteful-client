import React, { Component } from 'react';
import NotePageNav from '../NotePageNav/NotePageNav'

export default class AddNote extends Component {
   state = {};

   handleCreateNote = (e) => {
      e.preventDefault();
      const { noteName, noteContent, folderId } = this.state;
      this.props.handleNoteSubmit( noteName, noteContent, folderId );
   }
   componentDidMount() {
     
   }
   onFolderSelect = ({target}) => {
      const { value: folderId } = target;
      this.setState({
         folderId
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
      const folderList = this.props.folders;
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