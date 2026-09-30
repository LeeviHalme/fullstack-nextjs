"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { LOGIN_PATH, REGISTER_PATH } from "../constants";

function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex items-center gap-4">
      <Link href="/" className="hover:text-gray-300">
        home
      </Link>
      <Link href="/blogs" className="hover:text-gray-300">
        blogs
      </Link>
      <Link href="/users" className="hover:text-gray-300">
        users
      </Link>
      <div className="ml-auto flex items-center gap-4">
        {session ? (
          <>
            <Link href="/blogs/new" className="hover:text-gray-300">
              create new
            </Link>
            <Link href="/me" className="hover:text-gray-300">
              me
            </Link>
            <em className="text-gray-300">{session.user?.name} logged in</em>
            <button
              onClick={() => signOut()}
              className="bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded text-sm cursor-pointer">
              logout
            </button>
          </>
        ) : (
          <>
            <Link href={LOGIN_PATH} className="hover:text-gray-300">
              login
            </Link>
            <Link href={REGISTER_PATH} className="hover:text-gray-300">
              register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
