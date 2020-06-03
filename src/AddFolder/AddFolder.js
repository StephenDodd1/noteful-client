import React, { Component } from 'react';
import NotePageNav from '../NotePageNav/NotePageNav';

export default class AddFolder extends Component {
   constructor(props) {
      super(props);
      this.nameInput = React.createRef();
   }
   render() {

      return(
         <div className='note-page-container'>
         <NotePageNav />
         <form className='add-folder-form'>
            <input 
            type ='text' 
            placeholder='Folder Name' 
            defaultValue='newFolder' />
         </form>
         </div>
      )
   }
}