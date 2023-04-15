interface SearchProps {
  onInput: (e: Event) => void;
  filter: string;
}

const Search = ({ onInput, filter }: SearchProps) => {
  return (
    <div class="flex relative w-full">
      <input
        placeholder="Search Item ..."
        type="text"
        value={filter}
        onInput={(e) => onInput(e)}
        class="block w-full px-4 py-2 text-stone-800 bg-stone-200/75 rounded-md dark:bg-stone-700/40 dark:text-stone-100 dark:hover:bg-stone-700/75 dark:focus:bg-stone-700/75 hover:bg-stone-300/60 focus:bg-stone-300/60 focus:outline-none focus:ring-2 focus:ring-stone-400 placeholder:text-stone-400"
      />
      <span class="absolute right-2 top-2 text-stone-400" type="submit">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </span>
    </div>
  );
};

export default Search;
