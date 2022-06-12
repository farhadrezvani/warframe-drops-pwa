const fs = require("fs");
const crypto = require("crypto");
const HTMLParser = require("node-html-parser");
const fetch = require("node-fetch");

const url =
  "https://n8k6e2y6.ssl.hwcdn.net/repos/hnfvc0o3jnfvc873njb03enrf56.html";
const dir = "./public/data";

let arr = [];

const parseTable = (tr) => {
  let key;
  let drop;
  let i = 0;

  const terms = ["Source", "Rotation", "Stage", "Completion", "Final"];

  tr.forEach((element, index) => {
    if (index == i) {
      if (element.firstChild !== element.lastChild) {
        key = element.firstChild.text;
        drop = parseFloat(
          element.lastChild.text.match(/-?(?:\d+(?:\.\d*)?|\.\d+)/)[0]
        );
      } else key = element.text;
    } else if (element.classList.contains("blank-row")) {
      i = index + 1;
    } else if (element.text.includes("Rotation")) {
      key = key.split("/Rotation", 2)[0];
      key = key + "/" + element.text;
    } else if (!terms.some((term) => element.text.includes(term))) {
      let rarity = element.lastChild.text.split(/\s\(/, 2);
      let item = {
        place: key,
        name: element.firstChild.text
          ? element.firstChild.text
          : element.firstChild.nextSibling.text,
        rarity: rarity[0],
        chance: drop
          ? (parseFloat(rarity[1]) * (drop / 100)).toFixed(2)
          : parseFloat(rarity[1]),
      };

      arr.push(item);
    }
  });
};

try {
  fetch(url).then(async (response) => {
    const html = await response.text();
    const root = HTMLParser.parse(html);

    const hash = crypto.createHash("md5").update(html, "utf8").digest("hex");

    const date = new Date(
      response.headers.get("last-modified")
    ).toLocaleDateString("en-ZA");

    const info = {
      hash,
      build: new Date().toLocaleDateString("en-ZA"),
      update: date,
    };

    if (fs.existsSync(`${dir}/info.json`)) {
      let dist = require(`${dir}/info.json`);

      if (dist.hash == info.hash) {
        console.log("Data hasn't changed.");
        process.exit();
      }
    }

    let h3 = root.getElementsByTagName("h3").filter((e) => e.attributes.id);

    h3.map((e) => {
      let table = root.getElementById(e.attributes.id).nextElementSibling;
      let tr = table.childNodes.filter((element) => element.tagName == "TR");

      parseTable(tr);
    });

    arr = arr.filter((e) => !isNaN(e.chance));
    let drops = arr.sort((a, b) => b.chance - a.chance);

    console.log("Data updated.");
    console.log("Drops:", arr.length);

    fs.writeFileSync(`${dir}/info.json`, JSON.stringify(info));
    fs.writeFileSync(`${dir}/drops.json`, JSON.stringify(drops));
  });
} catch (err) {
  console.error(err);
}
