import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ setSearch }) => {
  return (
    <div className="w-full sm:w-1/4 md:w-1/3 lg:w-1/2 mx-auto">
      <div className="relative text-gray-600 focus-within:text-gray-400">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <FaSearch className="text-gray-400" />
        </span>
        <input
          className="w-full py-2 text-sm text-black rounded-full pl-10 focus:outline-none focus:bg-white focus:text-gray-900"
          type="text"
          placeholder="Search products"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchBar;
