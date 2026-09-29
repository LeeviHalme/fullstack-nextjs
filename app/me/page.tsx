import { redirect } from "next/navigation";
import { generateApiToken } from "../actions/users";
import { LOGIN_PATH } from "../constants";
import { getCurrentUser } from "../services/session";
import { getReadingListItemsByUserId } from "../services/readingLists";
import { markAsReadAction } from "../actions/readingLists";

async function ProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    return redirect(LOGIN_PATH);
  }

  const readingListItems = await getReadingListItemsByUserId(user.id);
  const unreadItems = readingListItems.filter(item => !item.read);
  const readItems = readingListItems.filter(item => item.read);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      <div className="mt-4 space-y-2">
        <div>
          <strong>Name:</strong> {user.name}
        </div>
        <div>
          <strong>Username:</strong> {user.username}
        </div>
      </div>
      <hr className="text-gray-500 my-6" />
      <h2 className="text-2xl font-bold mb-4">Reading List</h2>
      <h2 className="text-xl font-bold mb-4">Unread ({unreadItems.length})</h2>
      {unreadItems.length === 0 ? (
        <p className="text-gray-500">No unread items.</p>
      ) : (
        <ul className="space-y-2">
          {unreadItems.map(item => (
            <li key={item.id} className="border rounded p-3 flex justify-between items-center">
              <a
                href={item.blog.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline">
                {item.blog.title} by {item.blog.author}
              </a>
              <form action={markAsReadAction}>
                <input type="hidden" name="id" value={item.blog.id} />
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-500 px-3 py-1 rounded text-sm cursor-pointer">
                  Mark as Read
                </button>
              </form>
            </li>
          ))}
        </ul>
      )}
      <hr className="text-gray-500 my-6" />
      <h2 className="text-xl font-bold mb-4">Read ({readItems.length})</h2>
      {readItems.length === 0 ? (
        <p className="text-gray-500">No read items.</p>
      ) : (
        <ul className="space-y-2">
          {readItems.map(item => (
            <li key={item.id} className="border rounded p-3">
              <a
                href={item.blog.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline">
                {item.blog.title} by {item.blog.author}
              </a>
            </li>
          ))}
        </ul>
      )}
      <hr className="text-gray-500 my-6" />
      <h2 className="text-2xl font-bold mb-4">API Token</h2>
      {user.apiToken ? (
        <div className="mb-4 border border-gray-500 rounded p-4 space-y-2">
          <p className="text-gray-500">Current Token:</p>
          <input
            type="text"
            value={user.apiToken}
            readOnly
            className="border border-gray-500 bg-gray-800 rounded p-2 w-full"
          />
        </div>
      ) : (
        <p className="mb-4 text-gray-500">You don't have an API token yet.</p>
      )}
      <form action={generateApiToken}>
        <button
          type="submit"
          className="bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded text-sm cursor-pointer">
          Generate New Token
        </button>
      </form>
    </div>
  );
}

export default ProfilePage;
