import { Hero } from "@/components/hero";
import { IdeasList } from "@/components/ideas-list";
import { SearchBar } from "@/components/search-bar";

export default function Page() {
  return (
    <div className="w-full min-h-screen flex flex-col justify-start items-start gap-10 p-1 pt-20 max-w-7xl mx-auto">
      <Hero />
      <SearchBar />
      <IdeasList />
    </div>
  );
}
