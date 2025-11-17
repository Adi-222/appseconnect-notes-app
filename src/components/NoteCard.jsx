import { useState } from "react";

const NoteCard = ({ note, updateNote, deleteNote }) => {
  const [isEditing, setIsEditing] = useState(false);

  
  const [editTitle, setEditTitle] = useState(note.title);
  const [editContent, setEditContent] = useState(note.content);
  const [editTags, setEditTags] = useState(note.tags.join(", "));

  const handleSave = () => {
    
    if (editTitle.trim() === "") {
      alert("Please enter a title");
      return;
    }

   
    let tagsList = editTags.split(",");
    tagsList = tagsList.map((item) => item.trim());
    tagsList = tagsList.map((tag) => tag.replace("#", ""));
    tagsList = tagsList.filter((tag) => tag !== "");

    updateNote(note.id, editTitle, editContent, tagsList);
    setIsEditing(false);
  };

  return (
    <div
      className="
        bg-gray-900 
        border border-gray-700 
        p-4 
        rounded-lg 
        shadow 
        hover:border-orange-400 
        transition-colors
      "
      style={{ minHeight: "200px" }}
    >
      {/* Here is the code for the view notes displayed when the user is not editing also 
      checked the code this time its working fine in the production also */}
      {!isEditing && (
        <>
          <h3 className="text-white text-xl font-semibold">{note.title}</h3>

          <p className="text-gray-300 mt-2">{note.content}</p>

          <div className="flex gap-2 flex-wrap mt-3">
            {note.tags.map((tag) => (
              <span
                key={tag}
                className="
                  text-orange-300 
                  text-sm 
                  bg-gray-800 
                  px-2 
                  py-1 
                  rounded
                "
              >
                #{tag}
              </span>
            ))}
          </div>

            {/* so here I have mentioned the timeStamp thing which was earlier missed by me 
            here both the timestamps are the one for when the note is being created other for when the note is being updated */}
            
          <p className="text-xs text-gray-500 mt-3">
            Created: {note.createdAt}
          </p>
          <p className="text-xs text-gray-500">
            Updated: {note.updatedAt}
          </p>

          <div className="flex gap-4 mt-4">
            <button
              onClick={() => setIsEditing(true)}
              className="text-orange-400 hover:text-orange-300 underline"
            >
              Edit
            </button>

            <button
              onClick={() => deleteNote(note.id)}
              className="text-red-500 hover:text-red-400 underline"
            >
              Delete
            </button>
          </div>
        </>
      )}

     
      {isEditing && (
        <>
          <input
            className="
              w-full 
              mb-2 
              p-2 
              bg-gray-800 
              text-white 
              border border-gray-700 
              rounded
            "
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />

          <textarea
            className="
              w-full 
              mb-2 
              p-2 
              bg-gray-800 
              text-white 
              border border-gray-700 
              rounded
            "
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          />

          <input
            className="
              w-full 
              mb-2 
              p-2 
              bg-gray-800 
              text-white 
              border border-gray-700 
              rounded
            "
            value={editTags}
            onChange={(e) => setEditTags(e.target.value)}
          />

          <button
            onClick={handleSave}
            className="
              bg-orange-600 
              text-white 
              w-full 
              py-2 
              rounded 
              mt-2 
              hover:bg-orange-500
            "
          >
            Save
          </button>
        </>
      )}
    </div>
  );
};

export default NoteCard;
