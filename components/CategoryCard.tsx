import Link from 'next/link';
import { CategoryDetails } from '../typings';

interface Props {
  category: CategoryDetails;
}

function CategoryCard({ category }: Props) {
  return (
    <Link
      href={`/categories/${category.strCategory}`}
      className="rounded-3xl overflow-hidden h-[200px] relative shadow-xl bg-[#F8E7C4] cursor-pointer">
      <img
        src={category.strCategoryThumb}
        alt=""
        className="object-cover w-full h-full hover:scale-110 transition duration-300"
      />
      <div className="absolute h-full w-full top-0 bg-black opacity-50 pointer-events-none"></div>
      <span className="text-white absolute text-3xl top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] uppercase pointer-events-none">
        {category.strCategory}
      </span>
    </Link>
  );
}

export default CategoryCard;
