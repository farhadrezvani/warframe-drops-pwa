import { useState, useEffect } from "preact/hooks";
import { Description, Navbar, Result, Footer } from "./components";
import { Item } from "../generateData";

export function App() {
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [appInfo, setAppInfo] = useState({ update: "Loading ..." });
  const [drops, setDrops] = useState([]);
  const [result, setResult] = useState([]);

  const getInfo = () => {
    let info = JSON.parse(localStorage.getItem("info") as string);
    let drops = JSON.parse(localStorage.getItem("drops") as string);

    setLoading(true);

    fetch("/data/info.json")
      .then((response) => response.json())
      .then((data) => {
        if (info?.hash !== data.hash || !drops) {
          getDrops();
        } else {
          setLoading(false);
        }

        setAppInfo(data);
        localStorage.setItem("info", JSON.stringify(data));
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const getDrops = () => {
    fetch("/data/drops.json")
      .then((response) => response.json())
      .then((data) => {
        setDrops(data);
        localStorage.setItem("drops", JSON.stringify(data));
        setLoading(false);
      });
  };

  const searchItem = (e: Event) => {
    if (e.target instanceof HTMLInputElement) {
      let itemName = e.target.value;

      if (itemName.length >= 3) {
        setFilter(itemName);

        let data = drops.filter((item: Item) =>
          item.name.toLowerCase().includes(itemName.toLowerCase())
        );
        setResult(data);
      }
      if (itemName.length == 0) {
        setFilter("");
        setResult([]);
      }
    }
  };

  useEffect(() => {
    if (window.navigator.onLine) {
      getInfo();
    }

    let drops = JSON.parse(localStorage.getItem("drops") as string);
    let info = JSON.parse(localStorage.getItem("info") as string);

    setDrops(drops);
    setAppInfo(info);
  }, []);

  return (
    <>
      <Navbar
        onInput={searchItem}
        filter={filter}
        loading={loading}
        lastUpdate={appInfo?.update}
        refresh={getInfo}
      />
      <main class="max-w-3xl mx-auto p-4 sm:p-6 md:p-8">
        {!filter && <Description />}
        <Result filter={filter} result={result} />
      </main>
      <Footer />
    </>
  );
}
