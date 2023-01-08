import { useState } from 'react';
import { useRouter } from 'next/router';
import { MdSearch } from 'react-icons/md';

function SearchBar() {
  const [searchInput, setSearchInput] = useState('');
  const router = useRouter();

  const handleSearch = e => {
    e.preventDefault();
    setShowSearchbar(false);
    if (!searchInput) return;
    router.push({
      pathname: '/',
      query: {
        search: searchInput,
      },
    });
    setSearchInput('');
    searchbar.blur();
  };

  return (
    <form
      className="flex items-center space-x-1 cursor-pointer rounded-full border-2 bg-gray-200  border-gray-200 focus-within:border-primary-normal focus-within:bg-white px-1.5 py-1 overflow-hidden hover:border-primary-normal transition"
      onSubmit={e => handleSearch(e)}>
      <button type="submit">
        <MdSearch className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 fill-gray-400" />
      </button>
      <input
        id="search-bar"
        type="text"
        className="text-xs sm:text-base lg:text-lg w-16 sm:w-24 md:w-36 outline-none bg-gray-200 focus:drop-shadow-sm transition focus:bg-white"
        value={searchInput}
        placeholder="Search..."
        onChange={e =>
          setSearchInput(
            e.target.value.trim() !== ''
              ? e.target.value
              : e.target.value.trim()
          )
        }
      />
    </form>
  );
}

export default SearchBar;
