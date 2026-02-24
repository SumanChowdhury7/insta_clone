import { createContext, useEffect, useState } from "react";

import{ getPost } from './services/post.api'

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await getPost();
      setPosts(response.posts); 
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }
  return (
      <PostContext.Provider value={{posts, loading, fetchPosts}}>
          {children}
      </PostContext.Provider>
    )
}