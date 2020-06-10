import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import AddFolder from '../AddFolder/AddFolder';
import AddNote from '../AddNote/AddNote';
import { withRouter } from 'react-router'
import {getNotesForFolder, findNote, findFolder} from '../notes-helpers';
import './App.css';
import FetchError from '../FetchError/FetchError'

class App extends Component {   
    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            folders: []
        };
    }

    static defaultProps = {
        history: {
            push: () => {}
        }
    }

    deleteNote({target}) {
        const notes = this.state.notes;
        console.log(notes)
        let deletedNote = notes.find(note => 
            note.id === target.id)
        console.log(deletedNote)
        let indexOfDeletedNote = notes.findIndex(item => deletedNote === item)
        console.log(indexOfDeletedNote)
        let newNoteList = notes.filter(note => note.id !== target.id)
        this.setState(newNoteList)
        fetch(`http://localhost:9090/notes/1`, {
            method: 'DELETE',
            body: JSON.stringify([indexOfDeletedNote]),
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(res => {
            if(!res.ok){
                throw new Error('Something went wrong with deletion');
            }
            return res;
        })
        .catch(err => console.log('this is the error:', err))
    }

    handleCancel = () => {
        console.log(this.props.history)
        this.props.history.push('/')
        window.location.reload(true)
    }
    
    handleNoteSubmit( noteName, noteContent, folderId ) {
        var uniqid = require('uniqid');
        console.log(noteName,'is in', folderId, 'and has content', noteContent);
        const notes = { 'content': `${noteContent.toString()}`, 'folderId': `${folderId.toString()}`, 'modified': `${Date().toString()}`, 'id': `${uniqid()}`, 'name': `${noteName.toString()}`}
        fetch('http://localhost:9090/notes', {
            method: 'POST',
            body: JSON.stringify(notes),
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(res => {
            if(!res.ok){
                throw new Error('Something went wrong');
            }
            return res;
        })
        .then(res=>console.log(res.json()))
        .catch(err => console.log('this is the error:', err))
    }

    handleSubmit(folderName) {
        var uniqid = require('uniqid');
        const folderArr = folderName.split(' ');
        const formattedFolder = folderArr.join('-');
        const folder = { 'id': `${uniqid()}`, 'name': formattedFolder }
        fetch(`http://localhost:9090/folders`, {
            method: 'POST',
            body: JSON.stringify(folder),
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(res => {
            if(!res.ok){
                throw new Error('Something went wrong');
            }
            return res;
        })
        .then(res => console.log(res.json()))
        .catch(err => console.log('this is the error:', err))
    }

    componentDidMount() {
    Promise.all([
        fetch('http://localhost:9090/folders', {
            method: 'GET',
            header: {
                'content-type': 'application/json'
            }
        })
        .then(res=>res.json()).then(response => this.setState(this.state.folders = response)),
            fetch('http://localhost:9090/notes', {
            method: 'GET',
            header: {
                'content-type': 'application/json'
            }
        })
        .then(res=>res.json()).then(response => this.setState(this.state.notes = response)),
        console.log(this.state)
        ])  
    }

    renderNavRoutes() {
        const {notes, folders} = this.state;
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        render={routeProps => (
                            <NoteListNav
                                folders={folders}
                                notes={notes}
                                {...routeProps}
                            />
                        )}
                    />
                ))}

                <Route
                    path="/note/:noteId"
                    render={routeProps => {
                        const {noteId} = routeProps.match.params;
                        const note = findNote(notes, noteId) || {};
                        const folder = findFolder(folders, note.folderId);
                        return <NotePageNav {...routeProps} folder={folder} 
                    />
                    }}
                />

                <Route 
                    path="/add-folder" 
                    render={() => <AddFolder 
                        folders={this.state.folders}
                        handleSubmit={this.handleSubmit}
                    />
                }
                />
                
                <Route path="/add-note" 
                    render={() => <FetchError><AddNote
                        state={this.state}
                        handleNoteSubmit={this.handleNoteSubmit} 
                        handleCancel={this.handleCancel}
                    /></FetchError>
                }
                />
            </>
        );
    }

    renderMainRoutes() {
        const {notes, folders} = this.state;
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        render={routeProps => {
                            const {folderId} = routeProps.match.params;
                            const notesForFolder = getNotesForFolder(
                                notes,
                                folderId
                            );
                            return (
                                <NoteListMain
                                    {...routeProps}
                                    notes={notesForFolder}
                                    deleteNote={e=>this.deleteNote(e)}
                                />
                            );
                        }}
                    />
                ))}
                <Route
                    path="/note/:noteId"
                    render={routeProps => {
                        const {noteId} = routeProps.match.params;
                        const note = findNote(notes, noteId);
                        return <NotePageMain {...routeProps} note={note} />;
                    }}
                />
            </>
        );
    }

    render() {
        return (
            <div className="App">
                <nav className="App__nav">{this.renderNavRoutes()}</nav>
                <header className="App__header">
                    <h1>
                        <Link to="/">Noteful</Link>{' '}
                        <FontAwesomeIcon icon="check-double" />
                    </h1>
                </header>
                <main className="App__main">{this.renderMainRoutes()}</main>
            </div>
        );
    }
}

export default withRouter(App);
