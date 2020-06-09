import React, { Component } from 'react';
import NotePageNav from '../NotePageNav/NotePageNav';
import PropTypes from 'prop-types';

export default class AddFolder extends Component {
   state={}

   handleCreateFolder = (e) => {
      e.preventDefault();
      const { folderName } = this.state;
      this.props.handleSubmit(folderName);
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
               handleCancel ={this.handleCancel} />
               <label htmlFor='add-folder-form'>Add a folder: </label>
            <form className='add-folder-form' id='add-folder-form' onSubmit={e => this.handleCreateFolder(e)}>
               <label htmlFor='folder-name-input'>Folder Name: <span>&emsp;</span></label>
               <input 
                  onChange={e => {this.onFolderNameChange(e)}}
                  id='folder-name-input'
                  type ='text' 
                  name='folderName'
                  placeholder='Folder Name' 
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