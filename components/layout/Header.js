import Link from 'next/link';
import { MdLogin } from 'react-icons/md';
import Dropdown from '../ui/Dropdown';
import SearchBar from '../ui/SearchBar';
import { UserAuth } from '../../context/AuthContext';
import { useLogout } from '../../hooks/useLogout';
import { useScrollPosition } from '../../hooks/useScroll';

function Header() {
  const { user } = UserAuth();
  const { logout } = useLogout();
  const scrollPosition = useScrollPosition();

  return (
    <header
      className={
        scrollPosition > 5
          ? 'fixed w-full flex justify-between items-center h-[60px] px-2 md:px-6 bg-gray-light z-10'
          : 'fixed w-full flex justify-between items-center h-[80px] lg:h-[100px] px-4 md:px-6 lg:px-12 bg-gray-light z-10'
      }>
      <Link href="/" className="flex items-center space-x-4 cursor-pointer">
        <img
          src="/assets/logo.png"
          alt="logo"
          width={60}
          height={60}
          className={
            scrollPosition > 5
              ? 'scale-50 sm:scale-[0.65]'
              : 'scale-[0.65] sm:scale-[0.85] lg:scale-100'
          }
        />
        <span
          className={
            scrollPosition > 20
              ? 'hidden sm:block text-xl  lg:text-4xl -translate-x-6 lg:-translate-x-4 translate-y-[2px] lg:translate-y-[4px]'
              : 'hidden sm:block text-2xl  lg:text-5xl -translate-x-5 lg:-translate-x-2 translate-y-[2px] lg:translate-y-[4px]'
          }>
          Yum Book
        </span>
      </Link>
      <nav className="flex flex-col items-end xs:items-center xs:flex-row space-x-2 md:space-x-4 space-y-2 xs:space-y-0">
        <SearchBar />
        {!user && (
          <Link href="/login" className="header-link">
            <MdLogin className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 fill-primary-normal" />
            <span className="text-xs sm:text-base lg:text-lg">Login</span>
          </Link>
        )}
        <Dropdown user={user} logout={logout} />
      </nav>
    </header>
  );
}

export default Header;
