import Search from "./search";
import AnimatedIcon from "./animatedIcon";
import useDarkMode from "../hooks/useDarkMode";

interface NavbarProps {
  onInput: (e: Event) => void;
  filter: string;
  loading: boolean;
  lastUpdate: string;
  refresh: () => void;
}

const Navbar = ({
  onInput,
  filter,
  loading,
  lastUpdate,
  refresh,
}: NavbarProps) => {
  const [colorTheme, setTheme] = useDarkMode();

  const toggleDarkMode = () => {
    setTheme(colorTheme);
  };

  return (
    <>
      <div class="w-full flex-none border-0 md:border-b border-stone-900/10 dark:border-stone-50/5 bg-white dark:bg-stone-900">
        <div class="max-w-3xl mx-auto">
          <div class="py-2 border-b border-stone-900/10 md:px-8 md:border-0 dark:border-stone-300/10 mx-4 lg:mx-0">
            <div class="relative flex items-center justify-between text-center">
              <a class="flex-none overflow-hidden md:w-auto" href="/">
                <span class="sr-only">Warframe Drops PWA</span>
                <img src="/assets/favicon.svg" width="56" />
              </a>
              <div class="text-xs uppercase font-bold tracking-tighter px-4 mr-auto">
                Warframe
                <p class="font-light tracking-tight">Drops PWA</p>
              </div>

              <nav class="md:block flex-1 hidden text-sm leading-6 font-semibold text-stone-700 dark:text-stone-200 border-r border-stone-200 dark:border-stone-800 mr-6 pr-6">
                <Search onInput={onInput} filter={filter} />
              </nav>
              <div class="flex gap-4 items-center">
                <label class="sr-only">Theme</label>
                <button
                  onClick={toggleDarkMode}
                  class="text-stone-400 hover:text-stone-500 dark:hover:text-stone-300"
                >
                  <AnimatedIcon colorTheme={colorTheme} />
                </button>
                <a
                  href="https://github.com/farhadrezvani/warframe-drops-pwa"
                  class="block text-stone-400 hover:text-stone-500 dark:hover:text-stone-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span class="sr-only">Warframe Drop Data on GitHub</span>
                  <svg
                    viewBox="0 0 16 16"
                    height="20"
                    width="20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                  </svg>
                </a>
                <p
                  class="w-28 text-xs leading-5 font-semibold bg-stone-400/10 rounded-full py-1 px-3 flex items-center justify-between space-x-2 hover:bg-stone-400/20 dark:highlight-white/5"
                  id="headlessui-menu-button-1"
                  type="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {loading ? "Loading ..." : lastUpdate}
                  <button onClick={() => refresh()}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                      class={loading ? "animate-spin" : ""}
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="sticky top-0 z-50 w-full flex-none border-b border-stone-900/10 dark:border-stone-50/5 bg-white dark:bg-stone-900 flex items-center p-4 md:hidden">
        <Search onInput={onInput} filter={filter} />
      </div>
    </>
  );
};

export default Navbar;
