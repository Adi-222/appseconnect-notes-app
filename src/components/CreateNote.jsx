import { useState } from "react";

const CreateNote = ({ addNote }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  const handleCreate = () => {
    if (!title.trim()) return alert("Title is required!");

    const tagsArray = tags
      .split(",")
      .map((t) => t.trim().replace("#", ""))
      .filter((t) => t !== "");

    addNote(title, content, tagsArray);

    setTitle("");
    setContent("");
    setTags("");
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow mb-6">
      <input
        className="w-full mb-3 p-2 border rounded-md text-black"
        placeholder="Title *"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="w-full mb-3 p-2 border rounded-md text-black"
        placeholder="Write your note..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>

      <input
        className="w-full mb-3 p-2 border rounded-md text-black"
        placeholder="Tag Your Notes"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />

      <button
        onClick={handleCreate}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-700"
      >
        Add Note
      </button>
    </div>
  );
};

export default CreateNote;
