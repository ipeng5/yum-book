import Link from 'next/link';

function LoginModal({ closeModal }) {
  return (
    <div className="bg-white px-20 py-10 rounded flex flex-col justify-center items-center gap-6 shadow-xl">
      <p className="text-2xl">Please login first</p>
      <div className="flex gap-6 text-lg">
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
