import { useState } from 'react';
import { useRouter } from 'next/router';
import { MdSearch } from 'react-icons/md';

function SearchBar() {
  const [searchInput, setSearchInput] = useState('');
  const router = useRouter();

  const handleSearch = e => {
    e.preventDefault();
    if (!searchInput) return;
    router.push({
      pathname: '/',
      query: {
        search: searchInput,
      },
    });
    setSearchInput('');
    document.querySelector('#search-bar').blur();
  };

  return (
    <form
      className="flex items-center space-x-1 cursor-pointer"
      onSubmit={e => handleSearch(e)}>
      <input
        id="search-bar"
        type="text"
        className="bg-transparent px-1 border-b-[1px] w-24 md:w-36 border-primary-medium outline-none focus:drop-shadow-sm focus:border-b-3 focus:border-primary-normal transition"
        value={searchInput}
        onChange={e =>
          setSearchInput(
            e.target.value.trim() !== ''
              ? e.target.value
              : e.target.value.trim()
          )
        }
      />
      <button type="submit">
        <MdSearch className="h-5 w-5 md:h-6 md:w-6 fill-primary-normal" />
      </button>
    </form>
  );
}

export default SearchBar;
