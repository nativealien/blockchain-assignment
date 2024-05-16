import { fileURLToPath } from 'url'
import path from 'path'
import { promises as fs } from 'fs'

const folderPath = (meta) => { return path.dirname(fileURLToPath(meta)); }
const writeToLog = async (folder, file, data) => await fs.appendFile(`${ rootFolder }/${folder}/${file}`, data)
const loadJson = async (filePath) => JSON.parse(await fs.readFile( rootFolder + filePath, 'utf8' ))
const saveJson = async (filePath, chain) => await fs.writeFile( rootFolder + filePath, JSON.stringify(chain) ,'utf8' ) 

export { folderPath, writeToLog, loadJson, saveJson }
