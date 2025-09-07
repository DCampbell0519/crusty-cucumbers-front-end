import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { index } from "../../services/userService";

const Dashboard = () => {

    const { user } = useContext(UserContext);

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const fetchedData = await index();
            setUsers(fetchedData);
        }
        if (user) fetchUsers()
    }, [user])

  return (
    <main>
        <h1>Welcome back, {user.username}!</h1>
        <p>Check out your fellow cucumbers!</p>
        <h2>Users:</h2>
        {users.length === 0 ? (<p>No users in the database</p>) : (<ul>
            {users.map(user => {
                return <li key={user._id}>{user.username}</li>
            })}
        </ul>)}
    </main>
  )
}

export default Dashboard