// import { writeFile } from 'fs/promises'
import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'

const folderPath = (meta) => { return path.dirname(fileURLToPath(meta)); }

const writeSyncFile = (folder, file, data) => fs.appendFileSync(`${rootFolder}/${folder}/${file}`, data)

export { folderPath, writeSyncFile }