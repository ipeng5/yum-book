import { categoryDetails } from '../typings';

interface Props {
  category: categoryDetails;
}

function CategoryCard({ category }: Props) {
  return (
    <>
      <div className="rounded-3xl overflow-hidden  relative shadow-xl bg-gold-light">
        <img src={category.strCategoryThumb} alt="" className="object-cover w-full h-full" />
        <div className="absolute h-full w-full top-0 bg-black opacity-40"></div>
        <span className="text-white absolute text-2xl top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] uppercase">
          {category.strCategory}
        </span>
      </div>
    </>
  );
}

export default CategoryCard;
