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
  const [posts, setPosts] = useState([]); //we want all app to have access to posts that is why we set the state here not in Posts.js
  
  const [token, setToken] = useState(null)

  const fetchPosts = () => {
    fetch('https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/posts', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      } 
    })
      .then(response => response.json())
      .then(json => {
        console.log(json.data.posts)
        setPosts(json.data.posts)
       }) .catch (err => console.log(err))
      };

  const exchangeTokenForUser = () =>{
    
    const token = window.localStorage.getItem('token')// we could name it different
    setToken(token)
    if(token){
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
  useEffect (() => {
  exchangeTokenForUser()
  fetchPosts()
  },[token]);
  
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
      <Link to='/'>Home</Link>
      <Link to='/posts'>Posts ({posts.length})</Link>
    </nav>
      {
        user._id ? <div> Welcome {user.username} <button onClick = { logout }>Logout</button>  <Posts posts={posts} token = {token} /></div> : null //if we are not in a "form" we do not need to prevent default
      }
    
      {
        !user._id ? ( //if you do not have a login in it will show us a log in if we have it will just show "Welcome"
      <div>
    
      <Register />
      <Login exchangeTokenForUser = {exchangeTokenForUser}/>
   
     
      </div>) : null
}
      {/* <Routes>
        <Route path='/' element={<div></div>} />
        <Route path='/posts' element={
          <Posts posts={posts} />
        }
        />
      </Routes> */}
    </div>

  );
};




const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<HashRouter><App /></HashRouter>);
