import React, { Component } from 'react';
import NotePageNav from '../NotePageNav/NotePageNav';

export default class AddFolder extends Component {
   constructor(props) {
      super(props);
      this.state = {
         name: ' '
      }
   }
   handleSubmit(event) {
      event.preventDefault();
      const name=this.name.current.value;
      console.log(this.state.name)
  }
   componentDidMount() {

   }
   render() {

      return(
         <div className='note-page-container'>
         <NotePageNav />
         <form className='add-folder-form' 
            onSubmit={this.props.handleSubmit} >
            <label htmlFor='folder-name-input'>Folder Name: <span>&emsp;</span></label>
            <input 
               id='folder-name-input'
               type ='text' 
               placeholder='Folder Name' 
               defaultValue={this.state.name} 
               onSubmit={e=>this.handleSubmit(e)} />
            <button type='submit'>Submit</button>
         </form>
         </div>
      )
   }
}