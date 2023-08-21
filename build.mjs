//@ts-check
import fs from 'node:fs';

/**
 * @param {URL} file
 * @param {Array<RegExp>} [exclude]
 * @returns {Generator<URL>}
 */
const listFiles = function* (file, exclude = []) {
  const stats = fs.statSync(file);
  if (stats.isFile()) {
    yield file;
    return;
  }
  if (stats.isDirectory()) {
    file.pathname = file.pathname.replace(/\/*$/, '/');
    for (const name of fs.readdirSync(file)) {
      if (!exclude.some((re) => re.test(name))) {
        yield* listFiles(new URL(name, file), exclude);
      }
    }
  }
};

/**
 * @typedef {{pitch: number, yaw: number, text: string}} HotSpot
 * @typedef {{title: string, author?: string, hotSpots: Array<HotSpot>}} PannellumConfig
 * @param {URL} file
 * @returns {PannellumConfig | null}
 */
const loadPannellumJson = (file) => {
  const json = fs.readFileSync(file, 'utf8').trim();
  const data = JSON.parse(json);
  if (typeof data.title !== 'string') {
    return null;
  }
  if (!Array.isArray(data.hotSpots)) {
    return null;
  }
  return data;
};

const rootDir = new URL('.', import.meta.url);
const exclude = [/^node_modules/, /^\.git/, /^\.vscode/];
/** @type {Array<[(file: URL) => boolean, (file: URL) => void]>} */
const builders = [
  [
    (file) => /\.json$/.test(file.pathname),
    (file) => {
      const data = loadPannellumJson(file);
      if (!data) {
        return;
      }
      data.hotSpots.sort((a, b) => a.yaw - b.yaw);
      fs.writeFileSync(file, JSON.stringify(data, null, 4));
    },
  ],
];

for (const file of listFiles(rootDir, exclude)) {
  for (const [test, build] of builders) {
    if (test(file)) {
      console.info(`Build: ${file.pathname}`);
      build(file);
    }
  }
}
