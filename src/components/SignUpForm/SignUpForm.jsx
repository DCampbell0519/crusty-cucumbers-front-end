import React from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { signUp } from "../../services/authService.js";
import { UserContext } from "../../contexts/UserContext.jsx";

const SignUpForm = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    passwordConf: "",
    favoriteMovieQuote: "",
    bio: "",
    age: "",
    profilePhoto: "",
  });

  const { setUser } = useContext(UserContext);

  const { email, username, password, passwordConf, favoriteMovieQuote, bio, age, profilePhoto } =
    formData;

  const handleChange = (event) => {
    setMessage("");
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newUser = await signUp(formData);
      setUser(newUser);
      console.log(newUser);
      navigate("/");
    } catch (error) {
      setMessage(error.message);
    }
  };

  const isFormInvalid = () => {
    return !(
      email &&
      username &&
      password &&
      password === passwordConf
    );
  };

  return (
    <main>
      <h1>Become a Cucumber</h1>
      <p>{message}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email Address:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="confirm">Confirm Password:</label>
          <input
            type="password"
            id="confirm"
            name="passwordConf"
            value={passwordConf}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={age}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="favoriteMovieQuote">Favorite Movie Quote:</label>
          <input
            type="text"
            id="favoriteMovieQuote"
            name="favoriteMovieQuote"
            value={favoriteMovieQuote}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="bio">Personal Bio:</label>
          <input
            type="text"
            id="bio"
            name="bio"
            value={bio}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="profilePhoto">Profile Photo URL:</label>
          <input
            type="text"
            id="profilePhoto"
            name="profilePhoto"
            value={profilePhoto}
            onChange={handleChange}
          />
        </div>
        <div>
          <button disabled={isFormInvalid()}>Sign Up</button>
          <button onClick={() => navigate("/")}>Cancel</button>
        </div>
      </form>
    </main>
  );
};

export default SignUpForm;
