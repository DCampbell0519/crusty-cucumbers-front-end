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
    <div className='user-profile'>
      <h2>My Stats:</h2>
      <ul>Username: {myProfile.user.username}</ul>
    </div>
  )
}

export default ProfilePage