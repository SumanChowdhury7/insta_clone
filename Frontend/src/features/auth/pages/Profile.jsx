import React from "react";
import { useAuth } from "../../auth/hooks/useAuth";
import "../style/profile.scss";

const Profile = () => {

  const { user, loading } = useAuth();

  // loading state
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  // agar user nahi mila
  if (!user) {
    return <div className="loading">User not found</div>;
  }

  return (
    <div className="profile-page">

      <div className="profile-header">

        <div className="profile-img">
          <img
            src={user?.profileImage || "/default-avatar.png"}
            alt="profile"
          />
        </div>

        <div className="profile-info">

          <div className="top-row">
            <h2>{user?.username}</h2>
          </div>

          <div className="stats">
            <span>
              <b>{user?.posts || 0}</b> posts
            </span>

            <span>
              <b>{user?.followers || 0}</b> followers
            </span>

            <span>
              <b>{user?.following || 0}</b> following
            </span>
          </div>

          <p className="bio">{user?.bio || "No bio yet"}</p>

        </div>

      </div>

      <div className="divider"></div>

      <div className="posts-grid">

        {/* future me yaha real posts ayenge */}

        <div className="post"></div>
        <div className="post"></div>
        <div className="post"></div>
        <div className="post"></div>
        <div className="post"></div>
        <div className="post"></div>

      </div>

    </div>
  );
};

export default Profile;