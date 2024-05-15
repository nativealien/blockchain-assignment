// import { writeFile } from 'fs/promises'
import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'

const folderPath = (meta) => { return path.dirname(fileURLToPath(meta)); }

const writeToLog = (folder, file, data) => fs.appendFileSync(`${rootFolder}/${folder}/${file}`, data)

const loadJson = () => { return JSON.parse( fs.readFile(rootFolder + '/data/blockchain/chain.json', 'utf8' ) ) }
const saveJson = (chain) => fs.writeFile(rootFolder + '/data/blockchain/chain.json', JSON.stringify(chain) ,'utf8' ) 

export { folderPath, writeSyncFile }