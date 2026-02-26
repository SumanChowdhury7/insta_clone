import React from "react";
import { RouterProvider } from "react-router";
import AppRoutes from "./AppRoutes";
import "./features/shared/style.scss";
import { AuthProvider } from "./features/auth/auth.context";
import { PostProvider } from "./features/post/post.context";
// import Nav from "./shared/components/Nav";

const App = () => {
  return (
    // <Nav />
    <AuthProvider>
      <PostProvider>
        <AppRoutes />
      </PostProvider>
    </AuthProvider>
  );
};

export default App;
