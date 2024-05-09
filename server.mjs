import express from 'express'

import handleError from './middleware/handleError.mjs'
import blockchainRouter from './routes/blockchain-routes.mjs'
import nodeRouter from './routes/node-routes.mjs'

import { loggEvent } from './data/data-handler.mjs'


const app = express()

loggEvent('TEST1\n')

app.use(express.json())

app.use('/api/v1/blockchain', blockchainRouter)
app.use('/api/v1/nodes', nodeRouter)

app.all('*', (req, res, next) => {
    next(new Error(`Something wrong at ${req.originalUrl}`))
})

app.use(handleError)

const PORT = process.argv[2]

app.listen(PORT, () => console.log('Server up on port ' + PORT))