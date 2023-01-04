import Link from 'next/link';
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';
import { BsInfoCircle, BsPlayFill } from 'react-icons/bs';
import { MdDeleteOutline, MdOutlineModeEditOutline } from 'react-icons/md';

function DetailsHeader({
  meal,
  bookmarked,
  handleFavorite,
  source,
  openModal,
  handleDelete,
}) {
  return (
    <section className=" bg-white flex flex-col  py-20 justify-center items-center gap-6">
      <div className="flex flex-col items-center justify-center gap-10 max-w-[1500px] ">
        <h1 className="text-5xl text-center leading-tight ">{meal.strMeal}</h1>
        <div className="flex space-x-8 text-2xl items-center">
          {source === 'api' && (
            <p className="flex space -x-2">
              <span>Area:</span>
              <Link
                href={`/areas/${meal.strArea}`}
                className="text-primary-normal hover:underline">
                {meal.strArea}
              </Link>
            </p>
          )}
          <div className="flex space-x-2">
            <span>Category:</span>
            <Link
              href={
                source === 'api'
                  ? `/categories/${meal.strCategory}`
                  : '/my-recipes'
              }
              className="text-primary-normal hover:underline">
              {source === 'api' ? `${meal.strCategory}` : 'My Recipes'}
            </Link>
          </div>
          {!bookmarked && source == 'api' && (
            <MdFavoriteBorder
              className="text-3xl cursor-pointer"
              onClick={handleFavorite}
            />
          )}
          {bookmarked && source == 'api' && (
            <MdFavorite
              className="text-3xl cursor-pointer"
              onClick={handleFavorite}
            />
          )}
          {source === 'firestore' && (
            <div className="flex space-x-2">
              <MdOutlineModeEditOutline
                className="text-5xl cursor-pointer p-2 rounded-full hover:bg-gray-100 transition"
                onClick={openModal}
              />
              <MdDeleteOutline
                className="text-5xl cursor-pointer p-2 rounded-full hover:bg-gray-100 transition"
                onClick={handleDelete}
              />
            </div>
          )}
        </div>
        {source === 'api' && (
          <div className="flex gap-6">
            {meal.strSource && (
              <a
                href={meal.strSource}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 border-2 border-gray-400 hover:bg-gray-50 px-4 py-2 shadow-inner rounded transition">
                <BsInfoCircle />
                More Info
              </a>
            )}
            {meal.strYoutube && (
              <a
                href={meal.strYoutube}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 bg-primary-normal border-2 border-primary-normal shadow-inner hover:opacity-90 text-white px-4 py-2 rounded transition">
                <BsPlayFill className="text-2xl" />
                Watch On YouTube
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default DetailsHeader;
