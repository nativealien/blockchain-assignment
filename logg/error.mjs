import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export const errorLogg = (req, message) => {
    const loggPath = __dirname + '/files/error.log'
    const msg = `${req.method} ${req.originalUrl} - ${new Date().toLocaleDateString('sv-SE')} - ${new Date().toLocaleTimeString('sv-SE')}\n${message}\n`
    fs.appendFileSync(loggPath, msg)
}