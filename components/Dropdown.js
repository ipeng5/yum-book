import Link from 'next/link';
import { Menu } from '@headlessui/react';
import { RiArrowDownSLine } from 'react-icons/ri';
import {
  MdFavorite,
  MdLogout,
  MdLibraryAdd,
  MdAccountBox,
} from 'react-icons/md';

function Dropdown({ user, logout }) {
  return (
    <Menu as="div" className="relative">
      {({ open }) => (
        <>
          {user && (
            <Menu.Button className="header-link cursor-pointer outline-none">
              Hi, {user.displayName}
              <RiArrowDownSLine
                className={
                  open
                    ? 'text-3xl text-primary-normal rotate-180'
                    : 'text-3xl text-primary-normal'
                }
              />
            </Menu.Button>
          )}
          {open && (
            <Menu.Items
              className="flex flex-col absolute right-0 top-14 bg-white  rounded shadow-md z-50 w-56 outline-none"
              static>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/add-recipe"
                    className={`${
                      active ? 'dropdown-link-active' : 'dropdown-link'
                    }`}>
                    <MdLibraryAdd className="text-2xl text-gray-500" />
                    <span>Add recipe</span>
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/favorites"
                    className={`${
                      active ? 'dropdown-link-active' : 'dropdown-link'
                    }`}>
                    <MdFavorite className="text-2xl text-gray-500" />
                    <span>Favorites</span>
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/my-recipes"
                    className={`${
                      active ? 'dropdown-link-active' : 'dropdown-link'
                    }`}>
                    <MdAccountBox className="text-2xl text-gray-500" />
                    <span>My Recipes</span>
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={logout}
                    className={`${
                      active ? 'dropdown-link-active' : 'dropdown-link'
                    }`}>
                    <MdLogout className="text-2xl text-gray-500" />
                    <span>Logout</span>
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          )}
        </>
      )}
    </Menu>
  );
}

export default Dropdown;
