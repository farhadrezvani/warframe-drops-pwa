const ResultList = ({ name, place, rarity, chance }) => {
  return (
    <li class="flex justify-between bg-white border border-stone-300/50 hover:bg-white/75 dark:hover:bg-stone-50/10 p-4 rounded-lg scale-[0.975] hover:scale-100 transition duration-300 dark:bg-stone-800 dark:border-stone-600/25">
      <div>
        <h2 class="text-xl text-stone-600 dark:text-stone-50 font-bold">
          {name}
        </h2>
        <p>{place}</p>
      </div>
      <div class="self-end text-right">
        <p class="font-semibold text-stone-600 dark:text-stone-50">{chance}%</p>
        <p>{rarity}</p>
      </div>
    </li>
  );
};

export default ResultList;
