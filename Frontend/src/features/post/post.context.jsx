import { createContext, useEffect, useState } from "react";
import { getPost,createPost, myPosts,likePost,unLikePost } from "./services/post.api";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await getPost();
      setPosts(res.posts);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMyPosts = async () => {
    setLoading(true);
    try {
      const res = await myPosts();
      setPosts(res.posts);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  

  const handleCreatePost = async (imageFile,caption)=>{
setLoading(true);
const data = await createPost(imageFile,caption)
setPosts([ data.post, ...posts])
setLoading(false)
  }

const handleLike = async (postID) => {
  try {
    await likePost(postID);

    setPosts((prev) =>
      prev.map((post) =>
        post._id === postID
          ? {
              ...post,
              isLiked: true,
              likes: [...(post.likes || []), "temp"]
            }
          : post
      )
    );
  } catch (err) {
    console.log(err);
  }
};

const handleUnLike = async (postID) => {
  try {
    await unLikePost(postID);

    setPosts((prev) =>
      prev.map((post) =>
        post._id === postID
          ? {
              ...post,
              isLiked: false,
              likes: (post.likes || []).slice(0, -1)
            }
          : post
      )
    );
  } catch (err) {
    console.log(err);
  }
};



  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <PostContext.Provider value={{ posts, loading, fetchPosts, handleCreatePost,fetchMyPosts, handleLike, handleUnLike }}>
      {children}
    </PostContext.Provider>
  );
};

