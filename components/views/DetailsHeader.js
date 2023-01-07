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
    <section className="main-padding bg-white flex flex-col  py-14 lg:py-20 justify-center items-center gap-6">
      <div className="content-width flex flex-col items-center justify-center gap-8 lg:gap-10">
        <h1 className="text-lg md:text-2xl lg:text-3xl 2xl:text-4xl text-center leading-tight ">
          {meal.strMeal}
        </h1>
        <div className="flex flex-col xs:flex-row space-y-2 xs:space-y-0 xs:space-x-4 lg:space-x-8 text-sm md:text-base lg:text-lg 2xl:text-xl items-center">
          {source === 'api' && (
            <div className="flex space-x-2">
              <span>Area:</span>
              <Link
                href={`/areas/${meal.strArea}`}
                className="text-primary-normal hover:underline">
                {meal.strArea}
              </Link>
            </div>
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
              className="text-xl xl:text-2xl cursor-pointer"
              onClick={handleFavorite}
            />
          )}
          {bookmarked && source == 'api' && (
            <MdFavorite
              className="text-xl xl:text-2xl cursor-pointer"
              onClick={handleFavorite}
            />
          )}
          {source === 'firestore' && (
            <div className="flex space-x-2">
              <MdOutlineModeEditOutline
                className="text-4xl 2xl:text-[40px] cursor-pointer p-2 rounded-full hover:bg-gray-100 transition"
                onClick={openModal}
              />
              <MdDeleteOutline
                className="text-4xl 2xl:text-[40px] cursor-pointer p-2 rounded-full hover:bg-gray-100 transition"
                onClick={handleDelete}
              />
            </div>
          )}
        </div>
        {source === 'api' && (
          <div className="flex flex-col xs:flex-row gap-4 lg:gap-6">
            {meal.strSource && (
              <a
                href={meal.strSource}
                target="_blank"
                rel="noreferrer"
                className="flex justify-center items-center gap-2 border-[1px] xs:border-2 border-gray-400 hover:bg-gray-50 px-2 xl:px-4 py-2 xs:py-1 lg:py-1.5 xl:py-2 shadow-inner rounded transition">
                <BsInfoCircle />
                <span className="text-xs md:text-sm lg:text-base xl:text-lg">
                  More Info
                </span>
              </a>
            )}
            {meal.strYoutube && (
              <a
                href={meal.strYoutube}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 bg-primary-normal border-2 border-primary-normal shadow-inner hover:opacity-90 text-white px-2 xl:px-4 py-1 lg:py-1.5 xl:py-2 rounded transition">
                <BsPlayFill className="text-2xl" />
                <span className="text-xs md:text-sm  lg:text-base xl:text-lg">
                  Watch On YouTube
                </span>
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default DetailsHeader;
