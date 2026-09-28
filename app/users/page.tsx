import Link from "next/link";
import { getAllUsers } from "../services/users";

async function UserList() {
  const users = await getAllUsers();

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <Link href={`/users/${user.username}`}>
              {user.name} ({user.username})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default UserList;
