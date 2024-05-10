import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export const logger = (req, res, next) => {
    const loggPath = __dirname + '/files/logger.log'
    const msg = `${req.method} ${req.originalUrl} - ${new Date().toLocaleDateString('sv-SE')} - ${new Date().toLocaleTimeString('sv-SE')}\n`
    fs.appendFileSync(loggPath, msg)
    next()
}