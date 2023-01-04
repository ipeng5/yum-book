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
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.5 },
  },
];

const [toShow, toLeft] = variants;

const Error = () => {
  return (
    <main className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] flex items-center gap-10">
      <motion.img {...toShow} src="/assets/404-Icon.png" alt="" width={350} />
      <motion.div {...toLeft} className="flex flex-col gap-4 items-center">
        <p className="text-9xl text-primary-normal">404</p>
        <p className="text-5xl">Ooops...</p>
        <p className="text-3xl">Page not found</p>
        <Link
          href="/"
          className="bg-primary-normal py-4 px-10 rounded-xl text-white shadow-inner text-2xl mt-2 hover:bg-primary-dark">
          Back to home
        </Link>
      </motion.div>
    </main>
  );
};

export default Error;
