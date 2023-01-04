function LoginForm({
  values,
  handleSubmit,
  handleInput,
  isPending,
  emailLoginError,
}) {
  return (
    <form className="flex flex-col space-y-4 text-lg" onSubmit={handleSubmit}>
      <label className="flex flex-col gap-1">
        <span className="text-base text-gray-400">Email</span>
        <input
          type="email"
          onChange={handleInput}
          name="email"
          value={values.email}
          required
          className="form-input"
        />
      </label>
      <label className="flex flex-col gap-1 relative">
        <span className="text-base text-gray-400">Password</span>
        <input
          type="password"
          name="password"
          value={values.password}
          onChange={handleInput}
          required
          className="form-input"
        />
        {emailLoginError && !isPending && (
          <p className="text-primary-normal absolute top-[88px]">
            {emailLoginError}
          </p>
        )}
      </label>
      <div className="flex flex-col gap-4">
        {!isPending && (
          <button
            type="submit"
            className="form-button mt-16 border-2 border-primary-normal">
            Login
          </button>
        )}
        {isPending && (
          <button
            disabled
            className="form-button mt-16 border-2 border-primary-normal">
            Loading...
          </button>
        )}
      </div>
    </form>
  );
}

export default LoginForm;
