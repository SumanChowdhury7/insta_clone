import React, { useRef, useState } from 'react'
import "../style/createPost.scss";

const CreatePost = () => {

    const [caption, setCaption] = useState("");

    const postImageinputFieldRf = useRef(null)
  return (
    <main className="create-post-page">
        <div className="form-container">
            <h1>Create Post</h1>
            <form>
                <label htmlFor="postImage">Select Image</label>
                <input type="file" name='postImage' id='postImage'/>
                <input type="text" name='caption' id='caption' placeholder='Enter Caption' />

                <button className='button'>Create</button>
            </form>
        </div>
    </main>
  )
}

export default CreatePost