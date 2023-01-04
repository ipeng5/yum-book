function DetailsSteps({ stepsData, source }) {
  return (
    <section className="bg-white py-20">
      <div className="max-w-[1000px] mx-auto ">
        <h1 className="text-3xl  pb-10 text-primary-normal text-center">
          HOW TO COOK IT
        </h1>
        {source === 'api' && (
          <ol>
            {stepsData
              ?.filter(sentence => sentence !== '')
              .map((step, i) => {
                if (step === '') return;
                return (
                  <li key={i} className="pb-4 flex text-xl relative">
                    <div className="w-4 h-4 bg-primary-normal rounded-full absolute top-1"></div>
                    <span className=" pl-8 rounded">{step}</span>
                  </li>
                );
              })}
          </ol>
        )}
        {source === 'firestore' && (
          <ol>
            {stepsData?.map((step, i) => (
              <li key={i} className="pb-4 flex text-xl relative">
                <div className="w-4 h-4 bg-primary-normal rounded-full absolute top-1"></div>
                <span className=" pl-8 rounded">{step.step}</span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}

export default DetailsSteps;
