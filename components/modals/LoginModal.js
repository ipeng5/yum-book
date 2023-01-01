import Link from 'next/link';

export function LoginModal({ closeModal }) {
  return (
    <div className="bg-white px-20 py-10 rounded flex flex-col justify-center items-center gap-6 shadow-xl">
      <p className="text-2xl">Please login first</p>
      <div className="flex gap-6 text-lg">
        <button
          className="py-2 w-24 bg-[#ebebeb] rounded hover:bg-[#e2e2e2] shadow-inner"
          onClick={closeModal}>
          Back
        </button>
        <Link
          href="/login"
          className="py-2 w-24 bg-primary-normal text-white rounded hover:bg-primary-dark text-center shadow-inner">
          Login
        </Link>
      </div>
    </div>
  );
}
