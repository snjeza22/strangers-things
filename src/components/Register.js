import React, { useState} from 'react';

const Register = () => {
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  const register = (ev) => {
    ev.preventDefault();
    console.log("hello world")
    fetch('https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/users/register', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: {
          username: registerUsername,
          password: registerPassword
        }
      })
    })
      .then(response => response.json())
      .then(result => {
        if(!result.success){
          throw result.error.message
        }
        // if register success
        console.log(result);
        window.alert('Registration successful! You can use your new username and password to login');
      })
      .catch(err => console.log(err));
  }
return (
  <div>
  <form onSubmit={register}>
        <input
          placeholder='username'
          value={registerUsername}
          onChange={ev => setRegisterUsername(ev.target.value)} />
        <input
          placeholder='password'
          value={registerPassword}
          onChange={ev => setRegisterPassword(ev.target.value)} />

        <button>Register</button>
      </form>
   </div>
)
}
export default Register;