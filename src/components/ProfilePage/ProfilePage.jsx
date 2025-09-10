import { useState, useEffect } from 'react';
import { getMyProfile } from '../../services/userService';
import { useNavigate } from 'react-router';

const ProfilePage = () => {

  const navigate = useNavigate();
  const [myProfile, setMyProfile] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = await getMyProfile()
        setMyProfile(user)
      } catch (error) {
        setMessage(`Failed to load profile: ${error.message}`)
      }
    }
    fetchProfile()
  }, [])

  if (message) return <p>{message}</p>
  if (!myProfile) return <p>Loading...</p>

  return (
    <>
    <div className='profile-image'>
      <img src={myProfile.user.profilePhoto} alt="Your user photo" />
    </div>
    <div className='user-profile'>
      <h2>My Stats:</h2>
      <ul>Username: {myProfile.user.username}</ul>
      <ul>Age: {myProfile.user.age}</ul>
      <ul>Favorite Movie Quote: {myProfile.user.favoriteMovieQuote}</ul>
      <ul>Personal Bio: {myProfile.user.bio}</ul>
    </div>
    <button className="edit-profile" onClick={() => navigate('/profile/edit')}>Edit Profile</button>
    </>
  )
}

export default ProfilePage