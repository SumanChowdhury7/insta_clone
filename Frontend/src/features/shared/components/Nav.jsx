import { useState, useRef, useEffect } from "react";
import { FiMenu, FiUser, FiLogOut, FiPlusSquare } from "react-icons/fi";
import "../nav.scss";
import { useAuth } from "../../auth/hooks/useAuth";
import { useNavigate } from "react-router";

const Navbar = () => {

  const { handleLogout, loading } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();

  const logoutHandle = async () => {
    await handleLogout();
    navigate("/");
  };

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <nav className="navbar">

      <div
        onClick={() => navigate("/")}
        className="logo"
      >
        Insta Clone
      </div>

      <div className="menu-wrapper" ref={menuRef}>
        <FiMenu
          className="menu-icon"
          onClick={() => setOpen(!open)}
        />

        {open && (
          <div className="popup">

            <div
              onClick={() => navigate("/profile")}
              className="popup-item"
            >
              <FiUser />
              <span>Profile</span>
            </div>

            <div
              onClick={() => navigate("/create-post")}
              className="popup-item"
            >
              <FiPlusSquare />
              <span>Create Post</span>
            </div>

            <div
              onClick={logoutHandle}
              className="popup-item logout"
            >
              <FiLogOut />
              <span>Logout</span>
            </div>

          </div>
        )}

      </div>

    </nav>
  );
};

export default Navbar;