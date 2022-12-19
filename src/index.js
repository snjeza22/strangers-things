import ReactDOM from 'react-dom/client';
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';

const ORI_URL = 'https://strangers-things.herokuapp.com/api'
const COHORT = 'https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM'

const Posts = (props) => {
  const posts = props.posts

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {
          posts.map(post => {
            console.log(post)
            return (
              <li key={post.id}>
                <Link to={'/posts'}>{post.title}</Link>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}


const App = () => {
  const [posts, setPosts] = useState([]);
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('');
  const [user, setUser] = useState([]);

  const exchangeTokenForUser = () =>{
    const token = window.localStorage.getItem('token')// we could name it different
    if(token){
      fetch('https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/users/me', {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
}).then(response => response.json())
  .then(result => {
    const user = result.data //user is used to save user information
    setUser(user);
  })
  .catch(err => console.log(err));
    }
  }
  useEffect (() => {
  exchangeTokenForUser()
  },[]);

  const login = (ev) => {
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
        if(!result.success){//since we are in Promise we can throw
          throw result.error.message;
        }
        const token = result.data.token;
        window.localStorage.setItem('token', token);//we want to call it a token and it will access token
        exchangeTokenForUser()
      })
      .catch(err => console.log(err));
  }

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
        console.log(result);
      })
      .catch(err => console.log(err));
  }

 const logout = () => {
  window.localStorage.removeItem('token')
  setUser({});
}


  useEffect(() => {
    fetch('https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/posts')
      .then(response => response.json())
      .then(json => setPosts(json.data.posts));

  }, []);
  return (
    <div>
    
      <nav>
      <h1>Stranger's Things</h1>
        <Link to='/'>Home</Link>
        <Link to='/posts'>Posts ({posts.length})</Link>
      </nav>

      {
        user._id ? <div> Welcome {user.username} <button onClick = { logout }>Logout</button></div> : null //if we are not in a "form" we do not need to prevent default
      }
      {
        !user._id ? ( //if you do not have a login in it will show us a log in if we have it will just show "Welcome"
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
      <form onSubmit={login}>
        <input
          placeholder='username'
          value={loginUsername}
          onChange={ev => setLoginUsername(ev.target.value)} />
        <input
          placeholder='password'
          value={loginPassword}
          onChange={ev => setLoginPassword(ev.target.value)} />

        <button>Login</button>

      </form>
      </div>) : null
}
      <Routes>
        <Route path='/' element={<div></div>} />
        <Route path='/posts' element={
          <Posts posts={posts} />
        }
        />
      </Routes>
    </div>

  );
};




const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<HashRouter><App /></HashRouter>);
