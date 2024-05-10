import express from 'express'
import dotenv from 'dotenv'

import { logger } from './logg/logger.mjs'

import handleError from './middleware/handleError.mjs'
import blockchainRouter from './routes/blockchain-routes.mjs'
import nodeRouter from './routes/node-routes.mjs'

dotenv.config({ path: './config/config.env' });

const app = express()

app.use(express.json())

app.use(logger)

app.use('/api/v1/blockchain', blockchainRouter)
app.use('/api/v1/nodes', nodeRouter)

app.all('*', (req, res, next) => {
    next(new Error(`Something wrong at ${req.originalUrl}`))
})

app.use(handleError)

// if(process.env.NODE_ENV === 'development'){
// }

const PORT = process.argv[2]

app.listen(PORT, () => console.log('Server up on port ' + PORT))