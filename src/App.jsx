import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import CreateNote from "./components/CreateNote";
import NotesList from "./components/NotesList";

function App() {
  const [notes, setNotes] = useState(() => {
    return JSON.parse(localStorage.getItem("notes")) || [];
  });

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = (title, content, tags) => {
    const newNote = {
      id: Date.now(),
      title,
      content,
      tags,
      createdAt: new Date().toLocaleString(),
      updatedAt: new Date().toLocaleString(),
    };
    setNotes([newNote, ...notes]);
  };

  const updateNote = (id, title, content, tags) => {
    setNotes(
      notes.map((note) =>
        note.id === id
          ? {
              ...note,
              title,
              content,
              tags,
              updatedAt: new Date().toLocaleString(),
            }
          : note
      )
    );
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const filteredNotes = notes.filter((note) => {
    const q = searchQuery.toLowerCase();
    return (
      note.title.toLowerCase().includes(q) ||
      note.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  });

  return (
    <div className="min-h-screen bg-gray-950 text-white py-10 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Title */}
        <h1 className="text-5xl font-extrabold text-center mb-10 
                       bg-gradient-to-r from-orange-500 to-yellow-400 
                       bg-clip-text text-transparent animate-fadeIn">
          Notes App
        </h1>

        {/* Search */}
        <div className="animate-fadeIn delay-100">
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>

        {/* Create Note */}
        <div className="animate-fadeIn delay-200">
          <CreateNote addNote={addNote} />
        </div>

        {/* Notes List */}
        <div className="animate-fadeIn delay-300">
          <NotesList
            notes={filteredNotes}
            updateNote={updateNote}
            deleteNote={deleteNote}
          />
        </div>

      </div>
    </div>
  );
}

export default App;
