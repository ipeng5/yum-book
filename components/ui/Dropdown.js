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
            <Menu.Button className="header-link cursor-pointer outline-none text-base lg:text-lg">
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
              className="flex flex-col absolute right-0 top-14 bg-white rounded shadow-md w-44 lg:w-56 outline-none border-[1px] border-gray-200"
              static>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/add-recipe"
                    className={`${
                      active ? 'dropdown-link-active' : 'dropdown-link'
                    }`}>
                    <MdLibraryAdd className="text-xl lg:text-2xl text-gray-500" />
                    <span className="text-sm lg:text-base">Add recipe</span>
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
                    <MdFavorite className="text-xl lg:text-2xl text-gray-500" />
                    <span className="text-sm lg:text-base">Favorites</span>
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
                    <MdAccountBox className="text-xl lg:text-2xl text-gray-500" />
                    <span className="text-sm lg:text-base">My Recipes</span>
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
                    <MdLogout className="text-xl lg:text-2xl text-gray-500" />
                    <span className="text-sm lg:text-base">Logout</span>
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
