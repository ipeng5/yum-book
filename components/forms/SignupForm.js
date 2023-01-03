function SignupForm({
  values,
  handleSubmit,
  handleInput,
  isPending,
  isValid,
  isMatch,
  signupError,
}) {
  return (
    <form className="flex flex-col space-y-6 text-lg" onSubmit={handleSubmit}>
      <label className="flex flex-col gap-1">
        <span className="text-base text-gray-400">Username</span>
        <input
          type="text"
          onChange={handleInput}
          name="username"
          value={values.username}
          required
          className="form-input"
          maxLength="15"
        />
      </label>
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
      <label className="flex flex-col gap-1">
        <span className="text-base text-gray-400">Password</span>{' '}
        <input
          type="password"
          name="password"
          value={values.password}
          onChange={handleInput}
          required
          className="form-input"
        />
        {!isValid && (
          <span className="text-primary-normal text-base">
            Password must be at least 6 characters
          </span>
        )}
      </label>
      <label className="flex flex-col gap-1 relative">
        <span className="text-base text-gray-400">Confirm password</span>
        <input
          type="password"
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={handleInput}
          required
          className="form-input"
        />
        {signupError && !isPending && isMatch && (
          <p className="text-primary-normal absolute top-[88px]">
            {signupError}
          </p>
        )}
        {!isMatch && (
          <span className="text-primary-normal text-base absolute top-[88px]">
            Passwords do not match
          </span>
        )}
      </label>

      {!isPending && (
        <button type="submit" className="form-button !mt-20">
          Sign up
        </button>
      )}
      {isPending && (
        <button className="form-button !mt-20" disabled>
          Loading
        </button>
      )}
    </form>
  );
}

export default SignupForm;
