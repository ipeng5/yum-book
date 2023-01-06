import Link from 'next/link';
import { motion } from 'framer-motion';

const variants = [
  {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.3 },
  },
  {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: -10 },
    transition: { duration: 0.5 },
  },
];

const [toShow, toLeft] = variants;

const Error = () => {
  return (
    <main className="header-space w-full flex justify-center items-center xl:gap-10">
      <motion.img
        {...toShow}
        src="/assets/404-Icon.png"
        alt="Page not found"
        width={300}
        className="hidden md:block scale-75 xl:scale-100"
      />
      <motion.div
        {...toLeft}
        className="flex flex-col gap-2 xl:gap-4 items-center">
        <p className="text-6xl xl:text-9xl text-primary-normal">404</p>
        <p className="text-2xl xl:text-5xl">Ooops...</p>
        <p className="text-xl xl:text-3xl">Page not found</p>
        <Link
          href="/"
          className="bg-primary-normal py-2 2xl:py-4 px-4 xl:px-10 rounded-lg xl:rounded-xl text-white shadow-inner text-lg xl:text-2xl mt-2 hover:bg-primary-dark">
          Back to home
        </Link>
      </motion.div>
    </main>
  );
};

export default Error;
