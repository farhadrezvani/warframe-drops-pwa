import { useState, useEffect } from "preact/hooks";
import { Readme, Navbar, Result, Footer } from "./components";

export function App() {
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [appInfo, setAppInfo] = useState({ update: "Loading ..." });
  const [drops, setDrops] = useState([]);
  const [result, setResult] = useState([]);

  const getInfo = () => {
    let info = JSON.parse(localStorage.getItem("info"));
    let drops = JSON.parse(localStorage.getItem("drops"));

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

  const searchItem = (e) => {
    if (e.length >= 3) {
      setFilter(e);

      let data = drops.filter((item) =>
        item.name.toLowerCase().includes(e.toLowerCase())
      );
      setResult(data);
    }
    if (e.length == 0) {
      setFilter("");
      setResult([]);
    }
  };

  useEffect(async () => {
    if (window.navigator.onLine) {
      getInfo();
    }

    let drops = JSON.parse(localStorage.getItem("drops"));
    let info = JSON.parse(localStorage.getItem("info"));

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
        {!filter && <Readme />}
        <Result filter={filter} result={result} />
      </main>
      <Footer />
    </>
  );
}
