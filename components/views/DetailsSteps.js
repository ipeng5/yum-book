function DetailsSteps({ stepsData, source }) {
  return (
    <section className="bg-white  flex justify-center items-center px-4 xs:px-10 lg:px-20 py-14 lg:py-20">
      <div className="content-width">
        <h1 className="text-lg md:text-xl xl:text-2xl pb-4 md:pb-6 xl:pb-10 text-primary-normal">
          HOW TO COOK IT
        </h1>
        {source === 'api' && (
          <ol>
            {stepsData
              ?.filter(sentence => sentence !== '')
              .map((step, i) => {
                if (step.trim() === '') return;
                return (
                  <li
                    key={i}
                    className="pb-2 xl:pb-4 flex text-sm md:text-base lg:text-lg 2xl:text-xl relative">
                    <div className="w-3 h-3 lg:w-4 lg:h-4 bg-primary-normal rounded-full absolute top-1"></div>
                    <span className="pl-6 xs:pl-8 rounded">{step}</span>
                  </li>
                );
              })}
          </ol>
        )}
        {source === 'firestore' && (
          <ol>
            {stepsData?.map((step, i) => (
              <li
                key={i}
                className="pb-2 xl:pb-4 flex text-sm md:text-base lg:text-lg 2xl:text-xl relative">
                <div className="w-3 h-3 lg:w-4 lg:h-4 bg-primary-normal rounded-full absolute top-1"></div>
                <span className="pl-6 xs:pl-8 rounded">{step.step}</span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}

export default DetailsSteps;
