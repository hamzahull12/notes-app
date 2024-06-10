import React from 'react';
import NavNote from './header/NavNote';
import NoteList from './contents/NoteList';
import { getInitialData } from '../utils';
import AddNote from './contents/AddNote';

class NoteMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: getInitialData(),
      search: "",
    };

    this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onArchiveHandler = this.onArchiveHandler.bind(this);
    this.onSearchHandler = this.onSearchHandler.bind(this);
  }

  onAddNoteHandler({title, body}) {
    this.setState((prevState) => {
      return {
        notes: [
          ...prevState.notes,
          {
            id: +new Date(),
            title,
            createdAt: +new Date(),
            body,
            archived: false,
          },
        ],
      };
    })
  }

  onDeleteHandler(id) {
    const payloadNote = this.state.notes.filter((note) => note.id !== id);
    this.setState({notes: payloadNote});
  }

  onArchiveHandler(id) {
    const notes = this.state.notes.map((note) => (note.id === id ? {...note, archived: !note.archived} : note));
    this.setState({notes});
  }

  onSearchHandler(event) {
    this.setState(() => {
      return {
        search: event.target.value,
      };
    });
  }

  render() {
    const search = this.state.notes.filter((note) => note.title.toLowerCase().includes(this.state.search.toLocaleLowerCase()));
    const unactived = search.filter((note) => {
        return note.archived === false;
    });
    const actived = search.filter((note) => {
        return note.archived === true;
    });

    return (
      <>
        <NavNote search={this.state.search} onSearchChange={this.onSearchHandler}/>
        <div className="note-app__body">
          <AddNote addNote={this.onAddNoteHandler}/>
          <h2>Catatan</h2>
          {
            unactived.length > 0 ? <NoteList notes={unactived} 
            inputSearch={this.state.search}
            onDelete={this.onDeleteHandler}
            onArchive={this.onArchiveHandler} /> : <h1 className="notes-list__empty-message">Tidak ada Catatan</h1>
          }
          <h2>Arsip</h2>
          {
            actived.length > 0 ? <NoteList notes={actived}
            inputSearch={this.state.search}
            onDelete={this.onDeleteHandler}
            onArchive={this.onArchiveHandler} isArchive={this.onArchiveHandler}/> : <h1 className="notes-list__empty-message">Tidak ada Catatan</h1>
          }
        </div>
      </>
    );
  }
}

export default NoteMain;
