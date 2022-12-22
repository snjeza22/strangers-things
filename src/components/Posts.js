import React, { useEffect, useState } from 'react';
import EditPostForm from './EditPostForm';
import NewPostForm from './NewPostForm';

//import Delete from './Delete';

//import {createPost} from '../api/';

const Posts = (props) => {
  // const posts = props.posts //props object to posts key
  const [posts, setPosts] = useState([]); //we want all app to have access to posts that is why we set the state here not in Posts.js
  const [post, setPost] = useState([])

  const token = props.token
  const title = props.title
  const description = props.description
  const price = props.price
  const willDeliver = props.willDeliver


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
      }).catch(err => console.log(err))
  };


  useEffect(() => {
    fetchPosts();
  }, [token]);


  const createPost = (title, description, price, willDeliver) => {
    fetch(
      'https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/posts',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, //we needed to pass a token in order for it to work
        },
        body: JSON.stringify({
          post: {
            // title: "22 Snjeza's Post (fingers crossed)",
            title: title,
            // description: 'no descp, just hope :)',
            description: description,
            // price: '$priceless',
            price: price,
            willDeliver: willDeliver,
          },
        }),
      }
    )
      .then((response) => response.json())
      .then((result) => {
        const post = result.data.posts
        setPost(post)
        console.log(result);
        // after successful create
        // refresh posts
        fetchPosts();
      })
      .catch(console.error);
  };


  const updatePost = (_id, title, description, price, willDeliver) => {
    fetch(
      `https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/posts/${_id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, //we needed to pass a token in order for it to work
        },
        body: JSON.stringify({
          post: {
            title,
            description,
            price,
            willDeliver,
          },
        }),
      }
    )
      .then((response) => response.json())
      .then((result) => {
        const post = result.data.posts
        setPost(post)
        console.log(result);
        // after successful create
        // refresh posts
        fetchPosts();
      })
      .catch(console.error);
  };


  const deletePost = (_id) => {
    fetch(`https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/posts/${_id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then(response => response.json())//add fetch
      .then(() => {
        // after successful delete
        // refresh posts
        fetchPosts();
      })
      .catch(console.error);
  }
  // 

  return (
    <div>
      <h1>Posts ({posts.length})</h1>
      <NewPostForm createPost={createPost} token={token} />
      {/*<button onClick={() => createPost({
        token,
        title,
        description,
        price,
        willDeliver
      })
      }>New Post</button>*/}

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

                {post.isAuthor ? (
                  <>
                    {/*<button
                      onClick={() => { updatePost(post._id) }}
                    >Edit</button>*/}
                    <EditPostForm 
                      _id={post._id}
                      updatePost={updatePost}
                      title={post.title}
                      description={post.description}
                      price={post.price}
                      willDeliver={post.willDeliver}
                    />
                  </>
                ) : (
                  <button>Sent Message</button>
                )}
                {/* //null means that if we are not the author that we should not be rendering anything */}
                {post.isAuthor ? <button onClick={() => { deletePost(post._id) }}>Delete</button> : null}
              </div>
            )
          })
        }
      </ul>
    </div>
  )
}

export default Posts;