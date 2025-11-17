import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import CreateNote from "./components/CreateNote";
import NotesList from "./components/NotesList";

function App() {
  
  const [notes, setNotes] = useState(() => {
    let data;
    try {
      data = JSON.parse(localStorage.getItem("notes"));
    } catch (e) {
      console.error("error reading saved notes", e);
    }
    return data || [];
  });

  const [searchQuery, setSearchQuery] = useState(""); 

  
  useEffect(() => {
    
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  
  const addNote = (title, content, tags) => {
    const newObj = {
      id: Date.now(),  
      title: title,
      content: content,
      tags: tags,
      createdAt: new Date().toLocaleString(),
      updatedAt: new Date().toLocaleString()
    };

    
    setNotes([newObj, ...notes]);
  };

 
  const updateNote = (id, title, content, tags) => {
    const updatedList = notes.map((n) => {
      if (n.id === id) {
        return {
          ...n,
          title,
          content,
          tags,
          updatedAt: new Date().toLocaleString()
        };
      }
      return n;
    });

    setNotes(updatedList);
  };

 
  const deleteNote = (id) => {
    const left = notes.filter((item) => item.id !== id);
    setNotes(left);
  };


  const filteredNotes = notes.filter((note) => {
    const text = searchQuery.toLowerCase();

    const titleMatch = note.title.toLowerCase().includes(text);

    
    let tagMatch = false;
    for (let t of note.tags) {
      if (t.toLowerCase().includes(text)) {
        tagMatch = true;
        break;
      }
    }

    return titleMatch || tagMatch;
  });

  return (
    <div style={{backgroundColor:"#0d0d0d"}} className="min-h-screen text-white px-5 py-8">

      <div className="max-w-4xl mx-auto">

        {/* heading */}
        <h1 className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-orange-400 to-yellow-300 bg-clip-text text-transparent">
          Notes App
        </h1>

        {/* search input */}
        <div className="mb-5">
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>

        {/* form to create new note */}
        <div className="mb-7">
          <CreateNote addNote={addNote} />
        </div>

        {/* showing notes */}
        <NotesList 
          notes={filteredNotes} 
          updateNote={updateNote} 
          deleteNote={deleteNote} 
        />
      </div>
    </div>
  );
}

export default App;
