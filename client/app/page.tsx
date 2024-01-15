/* eslint-disable @next/next/no-img-element */
"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import { getAccessToken, getSession } from "@auth0/nextjs-auth0";
import axios from "axios";

export function ProfileClient() {
  const { user, error, isLoading, } = useUser();

  const handleNuts = async () => {
    const res = await axios.get(`/api/nuts`)
    console.log(res)
  }

  const getJWT = async () => {
    const token = await getSession()
    console.log(token)
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    user && (
      <div className="flex flex-col gap-10">
        <h2>{user.name}</h2>
        <p>{user.email}</p>

        <button
          onClick={async () => {
            console.log(await getAccessToken());
          }}
        >
          checkSession
        </button>
        <button
          onClick={() => {
            console.log(user);
          }}
        >
          user
        </button>
        <button
          onClick={handleNuts}
        >
          call 🥜
        </button>
        <button
          onClick={getJWT}
        >
          call getJWT
        </button>
      </div>
    )
  );
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 gap-10">
      <a href="/api/auth/login">Login</a>
      <a href="/api/auth/logout">Logout</a>
      <ProfileClient />
    </main>
  );
}
