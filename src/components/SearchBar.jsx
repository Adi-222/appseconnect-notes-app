const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <input
      type="text"
      placeholder="Search by title or tags..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="w-full text-black mb-4 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
    />
  );
};

export default SearchBar;
