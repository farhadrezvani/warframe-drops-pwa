import { useState, useEffect } from "preact/hooks";
import { Description, Navbar, Result, Footer } from "./components";
import { Item } from "../generateData";
import axios from "axios";

export function App() {
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [appInfo, setAppInfo] = useState({ update: "Loading ..." });
  const [drops, setDrops] = useState([]);
  const [result, setResult] = useState([]);

  const getInfo = async () => {
    let info = JSON.parse(localStorage.getItem("info") as string);
    let drops = JSON.parse(localStorage.getItem("drops") as string);

    setLoading(true);

    try {
      const response = await axios.get("/data/info.json");
      const data = response.data;

      if (info?.hash !== data.hash || !drops) {
        getDrops();
      } else {
        setLoading(false);
      }

      setAppInfo(data);
      localStorage.setItem("info", JSON.stringify(data));
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const getDrops = async () => {
    try {
      const response = await axios.get("/data/drops.json");
      const data = response.data;

      setDrops(data);
      localStorage.setItem("drops", JSON.stringify(data));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
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
