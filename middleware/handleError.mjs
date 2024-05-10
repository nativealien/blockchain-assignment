import { errorLogg } from "../logg/error.mjs";

const handleError = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'Internal Server Error';

    const message = `Method: ${ req.method }\nUrl: ${req.originalUrl}\nDate: ${new Date().toLocaleDateString('sv-SE')}\nTime: ${new Date().toLocaleTimeString('sv-SE')}\nstatus: ${err.statusCode}\nMessage: ${err.message}\n`

    errorLogg(req, message)

    res.status(err.statusCode).json({ success: err.success, message: err.message})
}

export default handleError