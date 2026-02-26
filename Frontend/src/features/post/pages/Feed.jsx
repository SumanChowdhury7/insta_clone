import React, { useEffect } from "react";
import "../style/feed.scss";
import { usePost } from "../hooks/usePost";
import { useAuth } from "../../auth/hooks/useAuth";
import Nav from "../../shared/components/Nav";

const Feed = () => {
  const { user, loading: authLoading } = useAuth();
  const { posts, loading, fetchPosts } = usePost();
  const { handleLike, handleUnLike } = usePost();
  useEffect(() => {
    if (user) {
      fetchPosts();
    }
  }, [user]);

  if (loading) return <p>Loading...</p>;
  return (
    <main className="feed-page">
      <Nav />
      <div className="feed">
        {posts?.map((post) => (
          <div className="post" key={post._id}>
            <div className="user">
              <img src={post.user.profileImage} alt="profile" />
              <p>{post.user?.username}</p>
            </div>

            <img className="post-image" src={post.imgUrl} alt="post" />

            <div className="bottom">
              <div className="actions">
                <div className="left">
                  <i
                    onClick={() => {
                      post.isLiked
                        ? handleUnLike(post._id)
                        : handleLike(post._id);
                    }}
                    className={`fa-${post.isLiked ? "solid" : "regular"} fa-heart ${
                      post.isLiked ? "liked" : ""
                    }`}
                  ></i>
                  <i className="fa-regular fa-comment"></i>
                  <i className="fa-regular fa-paper-plane"></i>
                </div>
                <div className="right">
                  <i className="fa-regular fa-bookmark"></i>
                </div>
              </div>

              <p className="likes">1,204 likes</p>

              <p className="caption">
                <span>{post.user?.username}</span>
                {post.caption}
              </p>

              <p className="time">2 HOURS AGO</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Feed;
