function LoginForm({
  values,
  handleSubmit,
  handleInput,
  isPending,
  emailLoginError,
}) {
  return (
    <form
      className="flex flex-col space-y-4 text-base lg:text-lg"
      onSubmit={handleSubmit}>
      <label className="flex flex-col sm:gap-1">
        <span className="form-label">Email</span>
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
        <span className="form-label">Password</span>
        <input
          type="password"
          name="password"
          value={values.password}
          onChange={handleInput}
          required
          className="form-input"
        />
        {emailLoginError && !isPending && (
          <p className="text-primary-normal absolute text-xs md:text-sm lg:text-base top-[70px] md:top-16 lg:top-[88px]">
            {emailLoginError}
          </p>
        )}
      </label>
      <div className="flex flex-col gap-4">
        {!isPending && (
          <button
            type="submit"
            className="form-button mt-6 md:mt-10 2xl:mt-16 border-primary-normal">
            Login
          </button>
        )}
        {isPending && (
          <button
            disabled
            className="form-button mt-6 md:mt-10 2xl:mt-16 border-primary-normal">
            Loading...
          </button>
        )}
      </div>
    </form>
  );
}

export default LoginForm;
