import { writeToLog } from "./fileManager.mjs"

class Res{
    constructor( method, code, endPoint ){
        this.method = method,
        this.code = code,
        this.endPoint = endPoint
    }
}

const logEvent = (req, res, next) => {
    if(res.statusCode < 400){
        const message = `| EVENT | ${req.method} ${res.statusCode} ${req.originalUrl} ${new Date().toLocaleDateString('sv-SE')} ${new Date().toLocaleTimeString('sv-SE')}` + '\n'
        writeToLog('data/log', 'event.log', message)
    } 
    next()
}

const logError = (req, res, next) => {
    const message = `| ERROR | ${req.method} ${res.statusCode} ${req.originalUrl} | ${new Date().toLocaleDateString('sv-SE')} ${new Date().toLocaleTimeString('sv-SE')}` + '\n'
    writeToLog('data/log', 'error.log', message)

    res.status(res.statusCode || 500).json(new Res(req.method, res.statusCode, req.originalUrl))
}


export { logEvent, logError, Res }