import { useState } from "react";

const CreateNote = ({ addNote }) => {
  const [title, setTitle] = useState("");    
  const [content, setContent] = useState("");
  const [tagsInput, setTagsInput] = useState(""); 

  const handleCreate = () => {
   
    if (title.trim() === "") {
      alert("Please enter a title");
      return;
    }

    
    let tagsArr = tagsInput.split(","); 
    tagsArr = tagsArr.map(tag => tag.trim());
    tagsArr = tagsArr.map(tag => tag.replace("#", ""));
    tagsArr = tagsArr.filter(tag => tag !== "");

    addNote(title, content, tagsArr);

    
    setTitle("");
    setContent("");
    setTagsInput("");
  };

  return (
    <div
      className="
        bg-gray-800 
        p-4
        rounded-lg 
        shadow 
        mb-6
        border border-gray-700
      "
    >
      {/* title */}
      <input
        className="
          w-full 
          mb-3 
          p-2 
          bg-gray-900 
          text-white 
          border border-gray-700 
          rounded
        "
        placeholder="Title *"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* note content */}
      <textarea
        className="
          w-full 
          mb-3 
          p-2 
          bg-gray-900 
          text-white 
          rounded 
          border border-gray-700
        "
        placeholder="Write your note here"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={3}
      ></textarea>

      {/* tags */}
      <input
        className="
          w-full 
          mb-3 
          p-2 
          bg-gray-900 
          text-white 
          rounded 
          border border-gray-700
        "
        placeholder="Tags (comma separated)"
        value={tagsInput}
        onChange={(e) => setTagsInput(e.target.value)}
      />

      <button
        className="
          bg-orange-600 
          text-white 
          w-full 
          py-2 
          rounded 
          hover:bg-orange-500
          mt-1
        "
        onClick={handleCreate}
      >
        Add Note
      </button>
    </div>
  );
};

export default CreateNote;
