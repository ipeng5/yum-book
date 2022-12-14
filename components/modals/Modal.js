import { AnimatePresence, motion } from 'framer-motion';
import { Dialog } from '@headlessui/react';

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

const [backdrop, modal] = variants;

function Modal({ open, closeModal, children }) {
  return (
    <AnimatePresence>
      {open && (
        <Dialog
          className="relative z-10"
          open={open}
          onClose={closeModal}
          static>
          <div
            className="fixed overflow-y-scroll inset-0 bg-black/40 flex justify-center items-center"
            aria-hidden="true"
            {...backdrop}>
            <Dialog.Panel as={motion.div} {...modal}>
              {children}
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}

export default Modal;
