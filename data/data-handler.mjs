import { writeFile, appendFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const loggEvent = async (string) => {
    const loggPath = __dirname + '/events/logg.txt'
    await appendFile(loggPath, string)
}

export { loggEvent }