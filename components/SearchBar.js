import { useRouter } from 'next/router';
import { useState } from 'react';
import { MdSearch } from 'react-icons/md';

function SearchBar() {
  const [searchInput, setSearchInput] = useState('');
  const router = useRouter();

  const handleChange = e => {
    setSearchInput(e.target.value.trim());
  };

  const handleSearch = e => {
    e.preventDefault();
    if (!searchInput) return;
    router.push({
      pathname: '/',
      query: {
        search: searchInput,
      },
    });
  };

  return (
    <form
      className="flex items-center space-x-1 cursor-pointer"
      onSubmit={e => handleSearch(e)}>
      <input
        type="text"
        className="bg-transparent px-2 border-b-2 border-primary-normal outline-none"
        onChange={e => handleChange(e)}
      />
      <button type="submit">
        <MdSearch className="h-6 w-6 fill-primary-normal" />
      </button>
    </form>
  );
}

export default SearchBar;
