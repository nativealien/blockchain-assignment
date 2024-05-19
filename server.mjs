import express from 'express'
import cors from 'cors'

import { nodeRouter } from './routes/nodeRouter.mjs'
import { blockRouter } from './routes/blockRouter.mjs'
import { initNode } from './utilities/initiate-node.mjs'

import { logEvent, logError, logUndefined } from './middleware/eventLogger.mjs'
import { folderPath } from './utilities/file-utilities.mjs'
global.rootFolder = folderPath(import.meta.url)

initNode()
const app = express()

app.use( express.json() )
app.use( cors() )

app.use( logEvent )

app.use( '/api/v1/blockchain', blockRouter)
app.use( '/api/v1/nodes', nodeRouter)

app.all('*', logUndefined)

app.use( logError )

const PORT = process.argv[2]
app.listen(PORT, () => console.log(`Server running on port ${PORT} folder ${rootFolder}`))