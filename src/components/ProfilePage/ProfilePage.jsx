import { useState, useEffect } from 'react';
import { getMyProfile } from '../../services/userService';

const ProfilePage = () => {

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
    </>
  )
}

export default ProfilePage