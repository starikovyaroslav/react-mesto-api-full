import React from 'react'


function Login (props) {

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault()
    props.onLogin({ password, email })
  }

  return (
    <div className="login">
      <h2 className="title login__title">Вход</h2>
      <form name="login" className="form login__form" onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          className="login__input input_type_email"
          placeholder="Email"
          value={email}
          onChange={handleChangeEmail}
        />
        <input
          name="password"
          type="password"
          className="login__input input_type_password"
          placeholder="Пароль"
          value={password}
          onChange={handleChangePassword}
        />
        <button type="submit" className="login__submit-button form__submit">Войти</button>
      </form>
    </div>
  )
}

export default Login;
