import React, { Component } from 'react';

export default class FetchError extends Component {
   constructor(props) {
      super(props);
         this.state = {
            hasError: false
         };
   }

   static getDerivedStateFromError() {
      console.log('getDerivedStateFromError has run')
      return { hasError: true }
   }

   render() {
      if(this.state.hasError) {
         return (
            <h2>Could not reach server. Try again later.</h2>
         )
      }
      return this.props.children;
   }
}