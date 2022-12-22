import React, { useState } from "react";


const EditPostForm = (props) => {
  // const createPost = props.createPost;
  const _id = props._id;
  const updatePost = props.updatePost;
  // const token = props.token;
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);
  const [price, setPrice] = useState(props.price);
  const [willDeliver, setWillDeliver] = useState(props.willDeliver)

  return (
    <div>
      <h4>Edit Post</h4>
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
      <button
        onClick={() => updatePost(_id, title, description, price, willDeliver)}
      >Save Changes</button>

    </div>
  )
}

export default EditPostForm;