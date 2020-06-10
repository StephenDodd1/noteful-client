import React, { Component } from 'react';
import NotePageNav from '../NotePageNav/NotePageNav';
import PropTypes from 'prop-types';

export default class AddFolder extends Component {
   state={}

   handleCreateFolder = (e) => {
      const appFolders = this.props.folders
      e.preventDefault();
      const { folderName } = this.state;
      for(let i = 0; i < appFolders.length; i++) {
         if(folderName === appFolders[i].name) {
            return (alert('There is already a folder with this name.'))}
         }
      this.props.handleSubmit(folderName);
      this.props.handleCancel()
   }

   onFolderNameChange = ({target}) => {
      const {value: folderName} = target;
      this.setState({
         folderName
      })
   }
   componentDidMount(){
      fetch('http://localhost:9090/folders', {
         method: 'GET',
         headers: {
            'content-type': 'application/json'
         }
      }).then(res => console.log(res.json()))
   }
   render() {

      return(
         <div className='folder-page-container'>
            <NotePageNav 
               handleCancel = {this.props.handleCancel} />
               <label htmlFor='add-folder-form'>Add a folder: </label>
            <form className='add-folder-form' id='add-folder-form' onSubmit={e => this.handleCreateFolder(e)}>
               <label htmlFor='folder-name-input'>Folder Name: <span>&emsp;</span></label>
               <input 
                  onChange={e => {this.onFolderNameChange(e)}}
                  id='folder-name-input'
                  type ='text' 
                  name='folderName'
                  placeholder='Folder Name' 
                  required
               /><br />
               <button type='submit' >Submit</button>
            </form>
         </div>
      )
   }
}

AddFolder.propTypes = {
   folders: PropTypes.array,
   handleSubmit: PropTypes.func
}