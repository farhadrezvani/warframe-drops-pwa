const Description = () => {
  return (
    <section class="text-justify bg-white border border-stone-300/50 hover:bg-white/75 dark:hover:bg-stone-50/10 p-4 rounded-lg scale-[0.975] hover:scale-100 transition duration-300 dark:bg-stone-800 dark:border-stone-600/25">
      <img class="mx-auto mb-4" src="/assets/favicon.svg" width="164" />
      <div class="text-2xl uppercase font-bold tracking-tighter text-center">
        Warframe&nbsp;
        <span class="font-light">Drops PWA</span>
      </div>
      <div class="mt-4">
        a warframe app that finds the best place to farm any in-game item by
        looking through the{" "}
        <a
          href="https://n8k6e2y6.ssl.hwcdn.net/repos/hnfvc0o3jnfvc873njb03enrf56.html"
          target="_blank"
          class="font-bold"
          rel="noopener noreferrer"
        >
          official drop tables
        </a>{" "}
        published by Digital Extremes in a simple ui, installable on supported
        browsers for offline usage. to get started type what you're looking for
        into the search above.
      </div>
    </section>
  );
};

export default Description;
