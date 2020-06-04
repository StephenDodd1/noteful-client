import React, { Component } from 'react';
import NotePageNav from '../NotePageNav/NotePageNav';

export default class AddFolder extends Component {
   state={}

   handleCreateFolder = () => {
      const { folderName } = this.state;
      this.props.handleSubmit(folderName);
   }

   onFolderNameChange = ({target}) => {
      const {value: folderName} = target;
      this.setState({
         folderName
      })
   }

   render() {

      return(
         <div className='folder-page-container'>
            <NotePageNav />
            <form className='add-folder-form' onSubmit={this.handleCreateFolder}>
               <label htmlFor='folder-name-input'>Folder Name: <span>&emsp;</span></label>
               <input 
               onChange={e => {this.onFolderNameChange(e)}}
               id='folder-name-input'
               type ='text' 
               name='folderName'
               placeholder='Folder Name' /><br />
               <button type='button' onClick={this.handleCreateFolder}>Submit</button>
            </form>
         </div>
      )
   }
}