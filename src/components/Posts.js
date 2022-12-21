import React from 'react';

import { createPost } from '../api/';

const Posts = (props) => {
  const posts = props.posts //props object to posts key
  const token= props.token
  const title = props.title
  const description = props.description
  const price = props.price
  const willDeliver = props.willDeliver
  return (
    <div>
      <h1>Posts</h1>
      <button onClick= {createPost({
        token,
        title,
        description,
        price,
        willDeliver
      })}>New Post</button>
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
                {post.isAuthor ? <button>Edit</button> : null}
                {/* //null means that if we are not the author that we should not be rendering anything */}
                {post.isAuthor ? <button>Delete</button> : null}
              </div>
            )
          })
        }
      </ul>
    </div>
  )
}

export default Posts;