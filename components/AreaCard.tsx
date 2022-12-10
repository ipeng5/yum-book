import Link from 'next/link';
import { AreaName } from '../typings';

interface Props {
  area: AreaName;
}

function AreaCard({ area }: Props) {
  return (
    <Link
      href={`/area/${area.strArea}`}
      className="rounded-3xl overflow-hidden h-[200px] relative shadow-xl cursor-pointer">
      <img
        src={`../assets/${area.strArea.toLowerCase()}.jpeg`}
        alt=""
        className="object-cover w-full h-full hover:scale-110 transition duration-300"
      />
      <div className="absolute h-full w-full top-0 bg-black opacity-40 pointer-events-none"></div>
      <span className="text-white absolute text-3xl top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] uppercase pointer-events-none">
        {area.strArea}
      </span>
    </Link>
  );
}

export default AreaCard;
