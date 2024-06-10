import NoteSearch from './NoteSearch'

const NavNote = ({ search, onSearchChange }) => {
  return (
    <div className="note-app__header">
      <h1>Notes Apps</h1>
      <NoteSearch search={search} onSearchChange={onSearchChange} />
    </div>
  );
}

export default NavNote;
