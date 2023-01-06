function Filter({ filter, setFilter }) {
  return (
    <div className="content-width py-[2px] md:py-2 lg:py-4  mx-auto text-base md:text-lg lg:text-xl xl:text-2xl flex space-x-2 md:space-x-4 items-center">
      <span className="text-lg md:text-xl lg:text-2xl xl:text-3xl">
        Filter:
      </span>
      <button
        onClick={() => {
          setFilter('area');
        }}
        className={`${filter === 'area' ? 'filter-active' : 'filter'}`}>
        Area
      </button>
      <button
        onClick={() => {
          setFilter('category');
        }}
        className={`${filter === 'category' ? 'filter-active' : 'filter'}`}>
        Category
      </button>
    </div>
  );
}

export default Filter;
