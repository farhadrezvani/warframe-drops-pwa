const Footer = () => {
  return (
    <footer class="max-w-3xl mx-auto md:px-8 px-0 pb-8 text-center text-sm uppercase font-light tracking-tighter">
      <hr class="w-full border-1 border-stone-900/10 dark:border-stone-50/10 mb-8" />
      Made With{" "}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="inline align-text-bottom"
        width="16"
        height="16"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
          clip-rule="evenodd"
        />
      </svg>{" "}
      By{" "}
      <a
        class="font-bold tracking-tighter"
        href="https://farhadrezvani.ir"
        target="_blank"
        rel="noopener noreferrer"
      >
        Farhad Rezvani
      </a>
    </footer>
  );
};

export default Footer;
