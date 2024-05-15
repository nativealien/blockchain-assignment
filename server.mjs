import express from 'express'
import cors from 'cors'

import { logEvent, logError } from './data/eventLogger.mjs'
import { folderPath } from './data/fileManager.mjs'
global.rootFolder = folderPath(import.meta.url)

const app = express()

app.use( express.json() )
app.use( cors() )

app.use( logEvent )

app.use( '/api/v1/blockchain', (req, res, next) => res.send( { message: res.message} ))

app.all('*', (req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404;
    next(error)
})

app.use( logError )

const PORT = process.argv[2]
app.listen(PORT, () => console.log(`Server running on port ${PORT} folder ${rootFolder}`))