import Link from 'next/link';
import SearchBar from './SearchBar.js';
import { UserAuth } from '../context/AuthContext';
import { useLogout } from '../hooks/useLogout';
import Dropdown from './Dropdown';
import { MdLogin } from 'react-icons/md';

function Header() {
  const { user } = UserAuth();
  const { logout } = useLogout();

  return (
    <header className="fixed w-full flex justify-between items-center  h-[150px] px-12 bg-gray-light z-10">
      <Link href="/" className="flex items-center space-x-4 cursor-pointer">
        <img src="/assets/logo.png" alt="logo" width={80} height={80} />
        <span className="text-6xl ">Yum Book</span>
      </Link>
      <nav className="flex space-x-4 text-xl">
        <SearchBar />
        {!user && (
          <Link href="/login" className="header-link">
            <MdLogin className="h-6 w-6 fill-primary-normal" />
            <span>Login</span>
          </Link>
        )}
        <Dropdown user={user} logout={logout} />
      </nav>
    </header>
  );
}

export default Header;
