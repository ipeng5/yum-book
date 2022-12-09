import { MdSearch, MdLogin, MdUploadFile } from 'react-icons/md';

function Header() {
  return (
    <header className=" flex justify-between items-center w-full py-6 px-12 bg-gray-light">
      <div className="flex items-center space-x-2">
        <img src="/assets/logo.png" alt="logo" width={50} height={50} />
        <span className="text-5xl ">YUMBOOK</span>
      </div>
      <nav className="flex space-x-10 text-xl">
        <div className="flex items-center space-x-1">
          <MdSearch className="h-6 w-6 fill-primary-normal" />
          <span>SEARCH</span>
        </div>
        <div className="flex items-center space-x-1">
          <MdUploadFile className="h-6 w-6 fill-primary-normal" />
          <span>ADD RECIPE</span>
        </div>
        <div className="flex items-center space-x-1">
          <MdLogin className="h-6 w-6 fill-primary-normal" />
          <span>LOGIN</span>
        </div>
      </nav>
    </header>
  );
}

export default Header;
