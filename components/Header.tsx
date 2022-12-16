import Link from 'next/link';
import { MdLogin, MdUploadFile } from 'react-icons/md';
import SearchBar from './SearchBar.js';

function Header() {
  return (
    <header className="flex justify-between items-center  h-[150px] px-12 bg-gray-light ">
      <Link href="/" className="flex items-center space-x-4 cursor-pointer">
        <img src="/assets/logo.png" alt="logo" width={80} height={80} />
        <span className="text-6xl ">Yum Book</span>
      </Link>
      <nav className="flex space-x-4 text-xl">
        <SearchBar />
        <Link href="/add-recipe" className="header-link">
          <MdUploadFile className="h-6 w-6 fill-primary-normal" />
          <span>ADD RECIPE</span>
        </Link>
        <Link href="/login" className="header-link">
          <MdLogin className="h-6 w-6 fill-primary-normal" />
          <span>LOGIN</span>
        </Link>
      </nav>
    </header>
  );
}

export default Header;
