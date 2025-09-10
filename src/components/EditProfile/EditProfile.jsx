import { useState, useEffect } from "react";
import { getMyProfile, updateMyProfile } from "../../services/userService";
import { useNavigate } from "react-router";

const EditProfile = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    age: "",
    favoriteMovieQuote: "",
    bio: "",
    profilePhoto: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { user } = await getMyProfile();
        setFormData({
          username: user.username,
          email: user.email,
          age: user.age,
          favoriteMovieQuote: user.favoriteMovieQuote,
          bio: user.bio,
          profilePhoto: user.profilePhoto,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const updatedUser = await updateMyProfile(formData);
      setMessage("Profile updated successfully!");
      navigate("/profile");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <main>
      <h1>What would you like to update?</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            name="age"
            id="age"
            value={formData.age}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="favoriteMovieQuote">Favorite Movie Quote:</label>
          <input
            type="text"
            name="favoriteMovieQuote"
            id="favoriteMovieQuote"
            value={formData.favoriteMovieQuote}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="bio">Bio:</label>
          <input
            type="text"
            name="bio"
            id="bio"
            value={formData.bio}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="profilePhoto">Profile Photo URL:</label>
          <input
            type="text"
            name="profilePhoto"
            id="profilePhoto"
            value={formData.profilePhoto}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">Update Profile</button>
        </div>
      </form>
    </main>
  );
};

export default EditProfile;
