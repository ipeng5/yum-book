import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';

const variants = [
  {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', duration: 0.5, bounce: 0.4 },
    },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.15 } },
  },
];

export const [backdrop, modal] = variants;

export function LoginModal({ open, closeModal }) {
  const router = useRouter();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="relative z-10"
          open={open}
          onClose={closeModal}
          static>
          <motion.div
            className="fixed inset-0 bg-black/40 flex justify-center items-center"
            aria-hidden="true"
            {...backdrop}>
            <div className="bg-white px-20 py-10 rounded flex flex-col justify-center items-center gap-6 shadow-xl">
              <p className="text-2xl font-medium">Please login first</p>
              <div className="flex gap-6 text-lg">
                <button
                  className="py-2 w-24 bg-[#ebebeb] rounded hover:bg-[#e2e2e2]"
                  onClick={closeModal}>
                  Back
                </button>

                <Link
                  href="/login"
                  className="py-2 w-24 bg-primary-normal text-white rounded hover:bg-primary-dark text-center">
                  Login
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
