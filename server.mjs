import express from 'express'
import cors from 'cors'

import { nodeRouter } from './routes/nodeRouter.mjs'
import { blockRouter } from './routes/blockRouter.mjs'
import { initChain } from './utilities/initiate.mjs'

import { logEvent, logError, logUndefined } from './data/eventLogger.mjs'
import { folderPath } from './data/fileManager.mjs'
global.rootFolder = folderPath(import.meta.url)

initChain()
const app = express()

app.use( express.json() )
app.use( cors() )

app.use( logEvent )

app.use( '/api/v1/blockchain', blockRouter)
app.use( '/api/v1/node', nodeRouter)

app.all('*', logUndefined)

app.use( logError )

const PORT = process.argv[2]
app.listen(PORT, () => console.log(`Server running on port ${PORT} folder ${rootFolder}`))

// Redis
