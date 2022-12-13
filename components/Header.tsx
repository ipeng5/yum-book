import Link from 'next/link';
import { MdSearch, MdLogin, MdUploadFile } from 'react-icons/md';

function Header() {
  return (
    <header className=" flex justify-between items-center w-full py-12 px-12 bg-gray-light">
      <Link href="/" className="flex items-center space-x-4 cursor-pointer">
        <img src="/assets/logo.png" alt="logo" width={60} height={60} />
        <span className="text-5xl ">Yum Book</span>
      </Link>
      <nav className="flex space-x-10 text-xl">
        <div className="flex items-center space-x-1 cursor-pointer">
          <input
            type="text"
            className="bg-transparent px-2 border-b-2 border-primary-normal outline-none"
          />
          <MdSearch className="h-6 w-6 fill-primary-normal" />
        </div>
        <Link
          href="add-recipe"
          className="flex items-center space-x-1 cursor-pointer">
          <MdUploadFile className="h-6 w-6 fill-primary-normal" />
          <span>ADD RECIPE</span>
        </Link>
        <Link href="/login" className="flex items-center space-x-2">
          <MdLogin className="h-6 w-6 fill-primary-normal" />
          <span>LOGIN</span>
        </Link>
      </nav>
    </header>
  );
}

export default Header;
