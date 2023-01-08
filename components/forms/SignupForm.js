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
    <form
      className="flex flex-col space-y-2 lg:space-y-4 xl:space-y-8 text-base lg:text-lg"
      onSubmit={handleSubmit}>
      <label className="flex flex-col sm:gap-1">
        <span className="form-label">Username</span>
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
        {!isValid && (
          <span className="text-primary-normal text-xs md:text-sm xl:text-base absolute top-[68px] xl:top-[75px]">
            Password must be at least 6 characters
          </span>
        )}
      </label>
      <label className="flex flex-col gap-1 relative">
        <span className="form-label">Confirm password</span>
        <input
          type="password"
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={handleInput}
          required
          className="form-input"
        />
        {signupError && !isPending && isMatch && (
          <p className="text-primary-normal text-xs md:text-sm xl:text-base absolute top-[68px] xl:top-[78px]">
            {signupError}
          </p>
        )}
        {!isMatch && (
          <span className="text-primary-normal text-xs md:text-sm xl:text-base absolute top-[68px] xl:top-[78px]">
            Passwords do not match
          </span>
        )}
      </label>

      {!isPending && (
        <button type="submit" className="form-button !mt-14 xl:!mt-20 !mb-6">
          Sign up
        </button>
      )}
      {isPending && (
        <button className="form-button !mt-14 xl:!mt-20 !mb-6" disabled>
          Loading...
        </button>
      )}
    </form>
  );
}

export default SignupForm;
