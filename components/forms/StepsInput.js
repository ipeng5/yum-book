function StepsInput({ step, index, handleChangeStep, handleRemoveStep }) {
  return (
    <div className="flex gap-2 items-center">
      <div className="w-6 md:w-20 text-gray-400 text-sm md:text-base xl:text-lg">
        <span className="hidden md:inline">Step</span>&nbsp;&nbsp;{index + 1}
      </div>
      <input
        type="text"
        className="w-full form-input"
        value={step.step}
        onChange={e => handleChangeStep(e, step.id)}
      />
      <div
        className="icon-remove"
        onClick={e => {
          handleRemoveStep(step.id);
        }}>
        <span>×</span>
      </div>
    </div>
  );
}

export default StepsInput;
