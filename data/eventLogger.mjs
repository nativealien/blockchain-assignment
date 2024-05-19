import { writeToLog } from "./fileManager.mjs"

const logEvent = (req, res, next) => {
    if(res.statusCode < 400){
        const message = `| EVENT | ${req.method} ${res.statusCode} ${req.originalUrl} ${new Date().toLocaleDateString('sv-SE')} ${new Date().toLocaleTimeString('sv-SE')}` + '\n'
        writeToLog('data/log', 'event.log', message)
    } 
    next()
}

const logUndefined = (req, res, next) => {
    next(new Error(`The resource at ${req.originalUrl} was not found`))
}

const logError = (err, req, res, next) => {
    const message = `# | ERROR | ${req.method} ${err.statusCode} ${req.originalUrl} | ${new Date().toLocaleDateString('sv-SE')} ${new Date().toLocaleTimeString('sv-SE')} | ${err.message}` + '\n'
    writeToLog('data/log', 'error.log', message)

    res.status(err.statusCode).json({status: err.statusCode, message: err.message})
}

export { logEvent, logError, logUndefined }