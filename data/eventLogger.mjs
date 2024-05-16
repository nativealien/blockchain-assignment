import { writeToLog } from "./fileManager.mjs"

const logEvent = (req, res, next) => {
    if(res.statusCode < 400){
        const message = `| EVENT | ${req.method} ${res.statusCode} ${req.originalUrl} ${new Date().toLocaleDateString('sv-SE')} ${new Date().toLocaleTimeString('sv-SE')}` + '\n'
        writeToLog('data/log', 'event.log', message)
    } 
    next()
}

const logError = (err, req, res, next) => {
    const message = `| ERROR | ${req.method} ${err.status} ${req.originalUrl} | ${new Date().toLocaleDateString('sv-SE')} ${new Date().toLocaleTimeString('sv-SE')} | ${err.message}` + '\n'
    writeToLog('data/log', 'error.log', message)

    res.status(err.status).json({status: err.status, message: err.message, endpoint: err.endpoint})
}


export { logEvent, logError }