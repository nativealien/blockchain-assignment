// import { writeFile } from 'fs/promises'
import { fileURLToPath } from 'url'
import path from 'path'
import { promises as fs } from 'fs'

const folderPath = (meta) => { return path.dirname(fileURLToPath(meta)); }

const writeToLog = async (folder, file, data) => await fs.appendFile(`${rootFolder}/${folder}/${file}`, data)

const loadJson = async () => await fs.readFile(rootFolder + '/data/blockchain/chain.json', 'utf8')

const saveJson = async (chain) => await fs.writeFile(rootFolder + '/data/blockchain/chain.json', JSON.stringify(chain) ,'utf8' ) 

export { folderPath, writeToLog, loadJson, saveJson }
