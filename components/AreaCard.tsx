import { areaName } from '../typings';

interface Props {
  area: areaName;
}

function AreaCard({ area }: Props) {
  return (
    <>
      <div className="rounded-3xl overflow-hidden h-[200px] relative shadow-xl bg-gold-light">
        <img
          src={`../assets/${area.strArea.toLowerCase()}.jpeg`}
          alt=""
          className="object-cover w-full h-full"
        />
        <div className="absolute h-full w-full top-0 bg-black opacity-40"></div>
        <span className="text-white absolute text-2xl top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] uppercase">
          {area.strArea}
        </span>
      </div>
    </>
  );
}

export default AreaCard;
