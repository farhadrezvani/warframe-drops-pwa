import ResultList from "./resultList";
import { Item } from "../../generateData";

interface ResultProps {
  filter: string;
  result: Item[];
}

const Result = ({ filter, result }: ResultProps) => {
  return (
    <section class="flex flex-col">
      <ul role="list" class="flex flex-col space-y-3">
        {filter && result.length == 0 && (
          <li class="flex justify justify-between bg-white border border-stone-300/50 hover:bg-white/75 dark:hover:bg-stone-50/10 p-4 rounded-lg scale-[0.975] hover:scale-100 transition duration-300 dark:bg-stone-800 dark:border-stone-600/25 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="flex-1">No Result Found</span>
          </li>
        )}
        {result.map((item) => (
          <ResultList
            name={item.name}
            rarity={item.rarity}
            chance={item.chance}
            place={item.place}
          />
        ))}
      </ul>
    </section>
  );
};

export default Result;
