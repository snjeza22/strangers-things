import React, {useState} from 'react';

//import {createPost} from '../api/';

const Posts = (props) => {
  const posts = props.posts //props object to posts key
  const [post, setPost] = useState([])
 
  const token= props.token
  const title = props.title
  const description = props.description
  const price = props.price
  const willDeliver = props.willDeliver

  const createPost = () => {
    fetch(
      'https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/posts',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          post: {
            title: "Snjeza's Post (fingers crossed",
            description:
              'no descp, just hope :)',
            price: '$priceless',
            willDeliver: true,
          },
        }),
      }
    )
      .then((response) => response.json())
      .then((result) => {
        const post = result.data.post
        setPost(post)
        console.log(result);
      })
      .catch(console.error);
  };

  const editPost = ()=>{
    fetch(`http://strangers-things.herokuapp.com/api/COHORT-NAME/posts/`, {
  method: "PATCH",
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    post: {
      title: "My favorite stuffed animal",
      description: "This is a pooh doll from 1973. It has been carefully taken care of since I first got it.",
      price: "$480.00",
      location: "New York, NY",
      willDeliver: true
    }
  })
}).then(response => response.json())
  .then(result => {
    console.log(result);
  })
  .catch(console.error);
  }
  return (
    <div>
      <h1>Posts</h1>
      <button onClick= {() => createPost({
        token,
        title,
        description,
        price,
        willDeliver
      })
      }>New Post</button>
      
      <ul>
        {
          posts.map(post => {

            return (

              <div key={post._id}
                className={post.isAuthor ? 'singlePost myPost' : "singlePost"}
              >
                
                {/* <CreatePost post = {post}/> */}
                <h3>
                  {post.title}
                </h3>
                <p>{post.description}</p>
                <p>Price: {post.price}</p>
                <p>Location {post.location}</p>
                <p>willDeliver {post.willDeliver}</p>

                {post.isAuthor ? <button onClick = {
                editPost(token)
                }>Edit</button> : null}
                {/* //null means that if we are not the author that we should not be rendering anything */}
                {post.isAuthor ? <button >Delete</button> : null}
              </div>
            )
          })
        }
      </ul>
    </div>
  )
}

export default Posts;