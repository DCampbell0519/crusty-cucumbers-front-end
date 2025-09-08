import { useContext } from "react";
import { Link } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import { signOut } from "../../services/authService";

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    signOut();
    setUser(null);
  };

  return (
    <nav>
      {user ? (
        <div className="navbar">
          <Link to="/">HOME</Link>
          <Link to="/profile">View Your Profile</Link>
          <Link to="/" onClick={handleSignOut}>
            Sign Out
          </Link>
        </div>
      ) : (
        <div className="navbar">
          <Link to="/sign-up">Sign Up</Link>
          <Link to="/sign-in">Sign In</Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
