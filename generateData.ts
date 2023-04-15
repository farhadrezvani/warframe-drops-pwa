import { readFileSync, writeFileSync, existsSync } from "fs";
import * as crypto from "crypto";
import axios from "axios";
import { parse, HTMLElement } from "node-html-parser";

const url =
  "https://n8k6e2y6.ssl.hwcdn.net/repos/hnfvc0o3jnfvc873njb03enrf56.html";
const dir = "./public/data";

export interface Item {
  place: string;
  name: string;
  rarity: string;
  chance: string;
}

let arr: Item[] = [];

const parseTable = (tr: HTMLElement[]) => {
  let key: string;
  let drop: number;
  let i = 0;

  const terms = ["Source", "Rotation", "Stage", "Completion", "Final"];

  tr.forEach((element, index) => {
    if (index == i) {
      if (element.firstChild !== element.lastChild) {
        key = element.firstChild.text;
        drop = parseFloat(element.lastChild.text.replace(/[^0-9.]/g, ""));
      } else key = element.text;
    } else if (element.classList.contains("blank-row")) {
      i = index + 1;
    } else if (element.text.includes("Rotation")) {
      key = key.split("/Rotation", 2)[0];
      key = key + "/" + element.text;
    } else if (!terms.some((term) => element.text.includes(term))) {
      let rarity = element.lastChild.text.split(/\s\(/, 2);
      let chance = parseFloat(rarity[1]);

      let item = {
        place: key,
        name: element.firstChild.text
          ? element.firstChild.text
          : // @ts-ignore
            element.firstChild.nextSibling.text,
        rarity: rarity[0],
        chance: drop ? (chance * (drop / 100)).toFixed(2) : chance.toFixed(2),
      };

      arr.push(item);
    }
  });
};

try {
  axios.get(url).then(async (response) => {
    const html = await response.data;
    const root = parse(html);

    const hash = crypto.createHash("md5").update(html, "utf8").digest("hex");

    const date = new Date(response.headers["last-modified"]).toLocaleDateString(
      "en-ZA"
    );

    const info = {
      hash,
      build: new Date().toLocaleDateString("en-ZA"),
      update: date,
    };

    if (existsSync(`${dir}/info.json`)) {
      let file = readFileSync(`${dir}/info.json`, "utf8");
      let dist = JSON.parse(file);

      if (dist.hash == info.hash) {
        console.log("Data hasn't changed.");
        process.exit();
      }
    }

    let h3 = root.getElementsByTagName("h3").filter((e) => e.attributes.id);

    h3.map((e) => {
      let table = root.getElementById(e.attributes.id).nextElementSibling;
      let tr = table.getElementsByTagName("TR");

      parseTable(tr);
    });

    arr = arr.filter((e) => !isNaN(Number(e.chance)));
    let drops = arr.sort((a, b) => Number(b.chance) - Number(a.chance));

    console.log("Data updated.");
    console.log("Drops:", arr.length);

    writeFileSync(`${dir}/info.json`, JSON.stringify(info));
    writeFileSync(`${dir}/drops.json`, JSON.stringify(drops));
  });
} catch (err) {
  console.error(err);
}
