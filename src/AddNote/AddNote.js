import React, { Component } from 'react';

export default class AddNote extends Component {
   state = {};

   handleCreateNote = () => {
      const { noteName } = this.state;
      this.props.handleSubmit(noteName);
   }

   onNoteNameChange = () => {

   }

   render() {
      return(
         <></>
      )
   }
}