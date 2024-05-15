import { writeSyncFile } from "./fileManager.mjs"

const logEvent = (req, res, next) => {
    if(res.statusCode < 400){
        const message = `| EVENT | ${req.method} ${res.statusCode} ${req.originalUrl} ${new Date().toLocaleDateString('sv-SE')} ${new Date().toLocaleTimeString('sv-SE')}` + '\n'
        writeSyncFile('data/log', 'event.log', message)
    }
    next()
}

const logError = (err, req, res, next) => {
    const message = `| ERROR | ${req.method} ${res.statusCode} ${req.originalUrl} | ${err.message} | ${new Date().toLocaleDateString('sv-SE')} ${new Date().toLocaleTimeString('sv-SE')}` + '\n'
    writeSyncFile('data/log', 'error.log', message)

    res.status(err.status || 500).json({ error: message})
}

export { logEvent, logError }