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
        scrollPosition > 20
          ? 'fixed w-full flex justify-between items-center  h-[90px] px-12 bg-gray-light z-10'
          : 'fixed w-full flex justify-between items-center  h-[150px] px-12 bg-gray-light z-10'
      }>
      <Link href="/" className="flex items-center space-x-4 cursor-pointer">
        <img
          src="/assets/logo.png"
          alt="logo"
          width={80}
          height={80}
          className={scrollPosition > 20 ? 'scale-[0.65]' : 'scale-100'}
        />
        <span
          className={
            scrollPosition > 20
              ? 'text-5xl -translate-x-4 translate-y-[4px]'
              : 'text-6xl translate-y-[4px]'
          }>
          Yum Book
        </span>
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
