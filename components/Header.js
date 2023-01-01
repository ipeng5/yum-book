import Link from 'next/link';
import SearchBar from './SearchBar.js';
import { Menu } from '@headlessui/react';
import { UserAuth } from '../context/AuthContext';
import { useLogout } from '../hooks/useLogout';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';
import {
  MdLogin,
  MdFavorite,
  MdLogout,
  MdLibraryAdd,
  MdAccountBox,
} from 'react-icons/md';

function Header() {
  const { user } = UserAuth();
  const { logOut } = useLogout();

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
        <Menu as="div" className="relative">
          {({ open }) => (
            <>
              {user && (
                <Menu.Button className="header-link cursor-pointer">
                  Hi, {user.displayName}
                  {!open && (
                    <RiArrowDownSLine className="text-3xl text-primary-normal" />
                  )}
                  {open && (
                    <RiArrowUpSLine className="text-3xl text-primary-normal" />
                  )}
                </Menu.Button>
              )}
              {open && (
                <Menu.Items
                  className="flex flex-col absolute right-0 top-14 bg-white  rounded shadow-md z-50 w-56"
                  static>
                  <Menu.Item>
                    <Link href="/add-recipe" className="dropdown-link">
                      <MdLibraryAdd className="text-2xl text-gray-500" />
                      <span>Add recipe</span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    <Link href="/favorites" className="dropdown-link">
                      <MdFavorite className="text-2xl text-gray-500" />
                      <span>Favorites</span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    <Link href="/my-recipes" className="dropdown-link">
                      <MdAccountBox className="text-2xl text-gray-500" />
                      <span>My recipes</span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    <button className="dropdown-link" onClick={logOut}>
                      <MdLogout className="text-2xl text-gray-500" />
                      <span>Logout</span>
                    </button>
                  </Menu.Item>
                </Menu.Items>
              )}
            </>
          )}
        </Menu>
      </nav>
    </header>
  );
}

export default Header;
