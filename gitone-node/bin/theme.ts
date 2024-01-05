import { readFile } from "fs/promises";
import { FontStyle } from "shiki";

async function main() {
  const path = "node_modules/shiki/themes/light-plus.json";
  const text = await readFile(path, { encoding: "utf8" });
  const match = text.match(/#[0-9A-Za-z]+/g);
  if (match) {
    const set = new Set(match);

    for (const m of Array.from(set).sort()) {
      console.log(
        `.skc-${m.substring(1).toLowerCase()} { color: ${m.toUpperCase()} }`,
      );
    }
  }
  for (const key in FontStyle) {
    if (isNaN(Number(key))) {
      console.log(`.skf-${key.toLocaleLowerCase()} { }`);
    }
  }
}

main();
