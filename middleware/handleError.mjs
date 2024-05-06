
const handleError = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'Internal Server Error';

    const message = `Method: ${ req.method } 
                    Url: ${req.originalUrl} 
                    Date: ${new Date().toLocaleDateString('sv-SE')} 
                    Time: ${new Date().toLocaleTimeString('sv-SE')} 
                    Success: ${err.success} 
                    Message: ${err.message}\n`

    res.status(err.statusCode).json({ success: err.success, message: err.message})
}

export default handleError