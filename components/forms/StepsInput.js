function StepsInput({ step, index, handleChangeStep, handleRemoveStep }) {
  return (
    <div className="flex gap-2 items-center">
      <span className="w-20 text-gray-400">Step&nbsp;&nbsp;{index + 1}</span>
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
