import React from "react";
import "../style/feed.scss"

const Feed = () => {
  return (
     <main className="feed-page">
      <div className="feed">
        <div className="post">
          
          <div className="user">
            <img
              src="https://images.unsplash.com/photo-1511367461989-f85a21fda167"
              alt="profile"
            />
            <p>username</p>
          </div>

          <img
            className="post-image"
            src="https://images.unsplash.com/photo-1768740067016-d7fddac028d6"
            alt="post"
          />

          <div className="bottom">
            <div className="actions">
              <div className="left">
                <i className="fa-regular fa-heart"></i>
                <i className="fa-regular fa-comment"></i>
                <i className="fa-regular fa-paper-plane"></i>
              </div>
              <div className="right">
                <i className="fa-regular fa-bookmark"></i>
              </div>
            </div>

            <p className="likes">1,204 likes</p>

            <p className="caption">
              <span>username</span> Lorem ipsum dolor sit amet consectetur
              adipisicing.
            </p>

            <p className="time">2 HOURS AGO</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Feed;
