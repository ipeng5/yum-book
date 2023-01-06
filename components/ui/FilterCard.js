import Link from 'next/link';

function FilterCard({ filterData, filterType }) {
  return (
    <Link
      href={
        filterType === 'area'
          ? `/areas/${filterData}`
          : `/categories/${filterData}`
      }
      className="rounded-xl lg:rounded-2xl xl:rounded-3xl overflow-hidden h-24 md:h-32 lg:h-36  xl:h-44 relative shadow-xl cursor-pointer">
      <img
        src={
          filterType === 'area'
            ? `../assets/${filterData.toLowerCase()}.jpeg`
            : `${filterData.strCategoryThumb}`
        }
        alt=""
        className="object-cover w-full h-full hover:scale-110 transition duration-300"
      />
      <div className="absolute h-full w-full top-0 bg-black opacity-40 pointer-events-none"></div>
      <span className="text-white absolute text-base md:text-xl lg:text-2xl xl:text-3xl top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] uppercase pointer-events-none">
        {filterType === 'area' ? `${filterData}` : `${filterData.strCategory}`}
      </span>
    </Link>
  );
}

export default FilterCard;
