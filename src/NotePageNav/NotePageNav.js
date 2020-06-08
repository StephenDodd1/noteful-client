import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NavCircleButton from '../CircleButton/CircleButton'
import './NotePageNav.css'

export default function NotePageNav(props) {
  return (
    <div className='NotePageNav'>
      <NavCircleButton
        tag='button'
        role='link'
        onClick = {props.handleCancel}
        className='NotePageNav__back-button'
      >
        <FontAwesomeIcon icon='chevron-left' />
        <br />
        Back
      </NavCircleButton>
      {props.folder && (
        <h3 className='NotePageNav__folder-name'>
          {props.folder.name}
        </h3>
      )}
    </div>
  )
}

NotePageNav.defaultProps = {
  history: {
    goBack: () => {}
  }
}
