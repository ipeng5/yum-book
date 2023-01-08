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
              <span className="text-sm sm:text-base lg:text-lg">
                Hi,{' '}
                {user?.displayName?.length > 10
                  ? `${user.displayName.substring(0, 8)}...`
                  : user.displayName}
              </span>
              <RiArrowDownSLine
                className={
                  open
                    ? 'text-base sm:text-2xl lg:text-3xl text-primary-normal rotate-180'
                    : 'text-base sm:text-2xl lg:text-3xl text-primary-normal'
                }
              />
            </Menu.Button>
          )}
          {open && (
            <Menu.Items
              className="flex flex-col absolute right-0 top-10 md:top-14 bg-white rounded shadow-md w-36 sm:w-44 lg:w-56 outline-none border-[1px] border-gray-200"
              static>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/add-recipe"
                    className={`${
                      active ? 'dropdown-link-active' : 'dropdown-link'
                    }`}>
                    <MdLibraryAdd className="text-sm sm:text-base lg:text-xl 2xl:text-2xl text-gray-500" />
                    <span className="text-xs xs:text-sm lg:text-base">
                      Add recipe
                    </span>
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
                    <MdFavorite className="text-sm sm:text-base lg:text-xl 2xl:text-2xl text-gray-500" />
                    <span className="text-xs xs:text-sm lg:text-base">
                      Favorites
                    </span>
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
                    <MdAccountBox className="text-sm sm:text-base lg:text-xl 2xl:text-2xl text-gray-500" />
                    <span className="text-xs xs:text-sm lg:text-base">
                      My Recipes
                    </span>
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
                    <MdLogout className="text-sm sm:text-base lg:text-xl 2xl:text-2xl text-gray-500" />
                    <span className="text-xs xs:text-sm lg:text-base">
                      Logout
                    </span>
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
