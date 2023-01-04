function Filter({ filter, setFilter }) {
  return (
    <div className="max-w-screen-2xl py-4  mx-auto text-2xl flex space-x-4 items-center">
      <span className="text-3xl">Filter by:</span>
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
