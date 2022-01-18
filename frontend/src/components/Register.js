import React from 'react'
import { Link } from 'react-router-dom';

function Register (props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onRegister(password, email)
  };

  return (
    <div className="register login">
      <h2 className="title register__title login__title">Регистрация</h2>
      <form name="register" className="form login__form register__form" onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          className="register__input input input_type_email login__input"
          placeholder="Email"
          value={email}
          onChange={handleChangeEmail}
          required
        />
        <input
          name="password"
          type="password"
          className="register__input input input_type_password login__input"
          placeholder="Пароль"
          value={password}
          onChange={handleChangePassword}
          required

        />
        <button
          type="submit"
          className="register__submit-button form__submit login__submit-button"
        >
          Зарегистрироваться
        </button>
      </form>
      <Link to="/signin" className="auth__link">
        Уже зарегистрированы? Войти
      </Link>
    </div>
  )
}

export default Register;
