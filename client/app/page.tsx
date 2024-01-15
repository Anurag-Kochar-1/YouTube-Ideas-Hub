import { Hero } from "@/components/hero";
import { SearchBar } from "@/components/search-bar";

// export function ProfileClient() {
//   const { user, error, isLoading } = useUser();

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>{error.message}</div>;

//   return (
//     user && (
//       <div className="flex flex-col gap-10 border-2 border-black p-5 m-5">
//         <h2>{user.name}</h2>
//         <p>{user.email}</p>
//       </div>
//     )
//   );
// }

export default function Page() {
  return (
    <div className="w-full min-h-screen flex flex-col justify-start items-start gap-10 p-1 pt-20 max-w-7xl mx-auto">
      <Hero />
      <SearchBar />
      {/* <ProfileClient /> */}
    </div>
  );
}
