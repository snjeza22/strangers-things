import React, { useState } from "react";


const NewPostForm = (props) => {
  const createPost = props.createPost;
  const token = props.token;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [willDeliver, setWillDeliver] = useState(false)

  return (
    <div>
      <h3>Add New Post</h3>
      <div>
        <input
          placeholder="Title"
          name="title"
          value={title}
          onChange={(ev) => { setTitle(ev.target.value) }}
        />
      </div>
      <div>
        <input
          placeholder="Description"
          name="description"
          value={description}
          onChange={(ev) => { setDescription(ev.target.value) }}
        />
      </div>
      <div>
        <input
          placeholder="Price"
          name="price"
          value={price}
          onChange={(ev) => { setPrice(ev.target.value) }}
        />
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="willDeliver"
            checked={willDeliver}
            onChange={(ev) => { setWillDeliver(ev.target.checked) }}
          />Will deliver
        </label>
      </div>
      <button onClick={() => createPost(title, description, price, willDeliver)}>New Post</button>

    </div>
  )
}

export default NewPostForm;