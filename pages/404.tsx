import Image from 'next/image';
import Link from 'next/link';
import icon404 from '../public/assets/404-Icon.png';

const NotFound = () => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] flex items-center gap-10">
      <Image src={icon404} width="400" height="400" alt="" className="" />
      <div className="flex flex-col gap-4 items-center">
        <p className="text-9xl text-primary-normal">404</p>
        <p className="text-5xl">Ooops...</p>
        <p className="text-3xl">Page not found</p>
        <Link
          href="/"
          className="bg-primary-normal py-4 px-10 rounded-xl text-white shadow-inner text-2xl mt-2 hover:bg-primary-dark">
          Back to home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
