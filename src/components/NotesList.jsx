import NoteCard from "./NoteCard";

const NotesList = ({ notes, updateNote, deleteNote }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {notes.length === 0 && (
        <p className="text-center text-gray-600">No notes found</p>
      )}

      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          updateNote={updateNote}
          deleteNote={deleteNote}
        />
      ))}
    </div>
  );
};

export default NotesList;
