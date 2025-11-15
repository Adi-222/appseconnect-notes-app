import { useState } from "react";

const NoteCard = ({ note, updateNote, deleteNote }) => {
  const [editMode, setEditMode] = useState(false);

  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [tags, setTags] = useState(note.tags.join(", "));

  const handleSave = () => {
    if (!title.trim()) return alert("Title is required!");

    const tagsArray = tags
      .split(",")
      .map((t) => t.trim().replace("#", ""))
      .filter((t) => t !== "");

    updateNote(note.id, title, content, tagsArray);
    setEditMode(false);
  };

  return (
    <div className="bg-gray-900 border border-gray-700 p-5 rounded-xl shadow-lg transition-all hover:shadow-orange-400/30 hover:border-orange-400 duration-300">
      
      {/* DISPLAY MODE */}
      {!editMode ? (
        <>
          <h3 className="text-2xl font-bold text-white">{note.title}</h3>

          <p className="mt-3 text-gray-300 leading-relaxed">{note.content}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {note.tags.map((tag) => (
              <span
                key={tag}
                className="bg-orange-500/20 text-orange-400 px-2 py-1 text-sm rounded-lg"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Timestamps */}
          <p className="text-xs text-gray-500 mt-4">
            Created: {note.createdAt}
          </p>
          <p className="text-xs text-gray-500">
            Updated: {note.updatedAt}
          </p>

          {/* Buttons */}
          <div className="flex gap-4 mt-5">
            <button
              onClick={() => setEditMode(true)}
              className="text-orange-400 font-semibold hover:text-orange-300 transition"
            >
              Edit
            </button>

            <button
              onClick={() => deleteNote(note.id)}
              className="text-red-500 font-semibold hover:text-red-400 transition"
            >
              Delete
            </button>
          </div>
        </>
      ) : (
        <>
          {/* EDIT MODE */}
          <input
            className="w-full mb-3 p-2 bg-gray-800 border border-gray-700 text-white rounded-md focus:border-orange-400 focus:outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="w-full mb-3 p-2 bg-gray-800 border border-gray-700 text-white rounded-md focus:border-orange-400 focus:outline-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <input
            className="w-full mb-3 p-2 bg-gray-800 border border-gray-700 text-white rounded-md focus:border-orange-400 focus:outline-none"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />

          <button
            onClick={handleSave}
            className="bg-orange-600 text-white px-4 py-2 rounded-lg w-full hover:bg-orange-500 transition"
          >
            Save
          </button>
        </>
      )}
    </div>
  );
};

export default NoteCard;
