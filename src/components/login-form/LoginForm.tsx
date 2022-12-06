import React, { useState } from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { login } from '../../store/apiActions';

function LoginForm () {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const loginFormSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login({login: email, password}));
    setIsSubmitted(true);
    setEmail('');
    setPassword('');

    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <section className="login">
      <h1 className="login__title">Sign in</h1>
      <form
        className="login__form form"
        action="#"
        method="post"
        onSubmit={loginFormSubmitHandler}
      >
        <div className="login__input-wrapper form__input-wrapper">
          <label className="visually-hidden">E-mail</label>
          <input
            className="login__input form__input"
            type="email"
            name="email"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="login__input-wrapper form__input-wrapper">
          <label className="visually-hidden">Password</label>
          <input
            className="login__input form__input"
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <button
          className="login__submit form__submit button"
          type="submit"
          disabled={isSubmitted}
        >
          Sign in
        </button>
      </form>
    </section>
  );
}

export default LoginForm;
