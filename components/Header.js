import Link from 'next/link';
import SearchBar from './SearchBar.js';
import { Menu } from '@headlessui/react';
import {
  MdLogin,
  MdFavorite,
  MdLogout,
  MdLibraryAdd,
  MdAccountBox,
} from 'react-icons/md';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';

function Header() {
  return (
    <header className="flex justify-between items-center  h-[150px] px-12 bg-gray-light relative">
      <Link href="/" className="flex items-center space-x-4 cursor-pointer">
        <img src="/assets/logo.png" alt="logo" width={80} height={80} />
        <span className="text-6xl ">Yum Book</span>
      </Link>
      <nav className="flex space-x-4 text-xl">
        <SearchBar />

        <Menu as="div" className="relative">
          <Menu.Button className="header-link cursor-pointer">
            ACCOUNT
            <RiArrowDownSLine className="text-3xl text-primary-normal" />
          </Menu.Button>
          <Menu.Items className="flex flex-col absolute right-0 top-14 bg-white  rounded shadow-lg z-50 w-56 outline-none">
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
              <Link href="/" className="dropdown-link">
                <MdLogout className="text-2xl text-gray-500" />
                <span>Logout</span>
              </Link>
            </Menu.Item>
          </Menu.Items>
        </Menu>
      </nav>
    </header>
  );
}

export default Header;
