import ReactDOM from 'react-dom/client';
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login.js'
import Register from './components/Register.js'
import Posts from './components/Posts'


// const ORI_URL = 'https://strangers-things.herokuapp.com/api'
// const COHORT = 'https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM'



const App = () => {
  const [user, setUser] = useState([]);

  const [token, setToken] = useState(null);


  const exchangeTokenForUser = () => {
    // take token from localstorage
    const token = window.localStorage.getItem('token')// we could name it different
    setToken(token)
    if (token) {
      fetch('https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/users/me', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
      }).then(response => response.json())
        .then(result => {
          const user = result.data //user is used to save user information
          setUser(user);
        })
        .catch(err => console.log(err));
    }
  }


  useEffect(() => {
    exchangeTokenForUser()
    // fetchPosts()
  }, [token]);


  const logout = () => {
    window.localStorage.removeItem('token')
    setUser({});
  }

  // useEffect(() => {


  // }, []);
  return (
    <div>
      <nav>
        <h1>Stranger's Things</h1>

      </nav>
      {
        user._id ?
          <div>
            <nav>
              <Link to='/' className='selected'>Home</Link>
              <Link to='/posts' className='selected'>POSTS</Link>
              <button onClick={logout}>Logout</button>
            </nav>
            Welcome {user.username} </div> : null //if we are not in a "form" we do not need to prevent default
      }

      {
        !user._id ? ( //if you do not have a login in it will show us a log in if we have it will just show "Welcome"
          <div>
            <Register />
            <Login setToken={setToken} />
          </div>
        ) : (
          <Routes>
            <Route path='/' element={<div>Home</div>} />
            <Route path='/posts' element={<Posts token={token} />} />
          </Routes>
        )
      }
    </div>

  );
};




const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<HashRouter><App /></HashRouter>);
