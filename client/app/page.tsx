import { Filters } from "@/components/filters";
import { Hero } from "@/components/hero";
import { IdeasList } from "@/components/ideas-list";
import { SearchBar } from "@/components/search-bar";

export default function Page() {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center gap-10 p-1 pt-20 max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto">
      <Hero />
      <SearchBar />
      <Filters />
      <IdeasList />
    </div>
  );
}
