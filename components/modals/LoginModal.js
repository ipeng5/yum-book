import Link from 'next/link';

function LoginModal({ closeModal }) {
  return (
    <div className="bg-white px-6 xs:px-10 md:px-14 xl:px-20 py-8 xl:py-10 rounded flex flex-col justify-center items-center gap-6 shadow-xl">
      <p className="text-base md:text-lg xl:text-2xl">Please login first</p>
      <div className="flex gap-4 xs:gap-6 text-lg">
        <button className="modal-button-light" onClick={closeModal}>
          Back
        </button>
        <Link href="/login" className="modal-button-dark">
          Login
        </Link>
      </div>
    </div>
  );
}

export default LoginModal;
