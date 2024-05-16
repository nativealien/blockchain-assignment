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

    res.status(err.status).json({message})
}

const logUndefined = (req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404;
    error.message = 'The request didnt go through... Check the endpoint.';
    error.endPoint = req.originalUrl
    next(error)
}


export { logEvent, logError, logUndefined }