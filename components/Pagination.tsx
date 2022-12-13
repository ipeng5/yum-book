interface Props {
  mealsPerPage: number;
  totalMeals: number;
  paginate: Function;
  currentPage: number;
}

function Pagination({
  mealsPerPage,
  totalMeals,
  paginate,
  currentPage,
}: Props) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalMeals / mealsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="w-ful flex justify-center">
      <ul className="flex space-x-10 pt-10 pb-6 text-lg">
        {pageNumbers.map(number => (
          <li
            key={number}
            className={
              currentPage === number
                ? 'transition cursor-pointer text-primary-normal scale-110'
                : 'transition cursor-pointer'
            }>
            <span onClick={() => paginate(number)}>{number}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Pagination;
