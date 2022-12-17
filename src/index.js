import ReactDOM from 'react-dom/client';
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link} from 'react-router-dom';

const ORI_URL = 'https://strangers-things.herokuapp.com/api'
const COHORT = 'https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM'

const Posts = (props) => {
  const posts = props.posts

  return(
    <div>
      <h1>Posts</h1>
      <ul>
        {
          posts.map(post => {
            console.log(post)
            return (
              <li key = {post.id}>
               <Link to= {'/posts'}>{post.title}</Link>
                </li>
            )
          })
        }
      </ul>
    </div>
  )
}


const App = ()=> {
  const [posts, setPosts] = useState([]);
  const [registerUsername, setRegisterUsername]= useState ('');
  const [registerPassword, setRegisterPassword]= useState ('');
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
    console.log(result);
  })
  .catch(err => console.log(err));
  }
  
  useEffect(()=>{
  fetch('https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/posts')
    .then ( response => response.json())
    .then ( json => setPosts(json.data.posts));
     
  }, []);
  return (
    <div>
      <h1>Stranger's Things</h1>
      <nav>
        <Link to='/'>Home</Link>
        <Link to='/posts'>Posts ({ posts.length })</Link>
      </nav>
      <form onSubmit = { register}>
        <input 
        placeholder='username' 
        value = {registerUsername} 
        onChange = {ev => setRegisterUsername(ev.target.value)}/>
        <input 
        placeholder='password' 
        value = {registerPassword} 
        onChange = {ev => setRegisterPassword(ev.target.value)}/>
        
        <button>Register</button>
      </form>
      <form>
        <input 
        placeholder='username'
        />
        <input placeholder='password'/>
        <button>Login</button>
      </form>
      <Routes>
        <Route path='/' element= {<div></div> } />
        <Route path = '/posts' element = { 
          <Posts posts = { posts } />
        }
        />
      </Routes> 
    </div>

  );
};

const login = (ev)=> {
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
    const token = result.data.token;
    window.localStorage.setItem('token', token);
    fetch('https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/users/me', {
      headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    })
    .then(response => response.json())
    .then(result => {
      const user = result.data;
      setUser(user);
    })
    .catch(console.error);
  })
  .catch(err => console.log(err));
}


const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<HashRouter><App /></HashRouter>);
