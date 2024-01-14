"use client";

export default function Home() {
  const handleGoogleAuth = () => {
    try {
      window.open("http://localhost:8000/api/v1/auth/google/callback", "_self");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button onClick={handleGoogleAuth}> google it </button>
    </main>
  );
}