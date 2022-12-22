import React, { useState } from 'react';



const Login = (props) => {
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  

  const {
    /*
    loginUsername,
    setLoginUsername,
    loginPassword,
    setLoginPassword,
    */
    setToken
  } = props;



  const login = (ev) => {
    // login by username and password
    // uf succesfull we git TOKEN as a result
    // than we save token in localstrage
    ev.preventDefault();
    console.log('login');
    fetch('https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/users/login', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: {
          username: loginUsername,
          password: loginPassword
        }
      })
    })
      .then(response => response.json())
      .then(result => {
        if (!result.success) {
          throw result.error.message;
        }
        const token = result.data.token;
        // we save token in localstorage
        window.localStorage.setItem('token', token);//we want to call it a token and it will access token
        // also we save token in state of App component
        setToken(token);
        // exchangeTokenForUser()
      })
      .catch(err => console.log(err));
  }

  return (
    <div>
      <form onSubmit={login}>
        <input
          placeholder='username'
          value={loginUsername}
          onChange={ev => setLoginUsername(ev.target.value)} />
        <input
          placeholder='password'
          type='password'
          value={loginPassword}
          onChange={ev => setLoginPassword(ev.target.value)} />

        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;