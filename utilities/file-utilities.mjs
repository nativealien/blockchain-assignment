import { fileURLToPath } from "url";
import path from "path";
import { promises as fs } from "fs";

const folderPath = (meta) => {
  return path.dirname(fileURLToPath(meta));
};
const writeToLog = async (folder, file, data) =>
  await fs.appendFile(`${rootFolder}/${folder}/${file}`, data);
const loadJson = async (filePath) => {
  const rawFile = await fs.readFile(rootFolder + filePath, "utf8");
  if (rawFile === "") return [];
  else return JSON.parse(rawFile);
};
const saveJson = async (filePath, file) =>
  await fs.writeFile(rootFolder + filePath, JSON.stringify(file), "utf8");

export { folderPath, writeToLog, loadJson, saveJson };
