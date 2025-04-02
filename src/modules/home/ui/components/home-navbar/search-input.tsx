import { SearchIcon } from "lucide-react";

export const SearchInput = () => {
  // TODO: add search functionality
  return (
    <form className="flex w-full max-w-[600px]">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search"
          className="w-full rounded-l-full border py-2 pr-12 pl-4 focus:border-blue-500 focus:outline-none"
        />
        {/* TODO: add remove search button */}
      </div>

      <button
        type="submit"
        className="rounded-r-full border border-l-0 px-5 py-2.5 not-dark:bg-gray-100 not-dark:hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-neutral-800 dark:hover:bg-neutral-700"
      >
        <SearchIcon className="size-5" />
      </button>
    </form>
  );
};
