import express from 'express'

import Blockchain from './models/Blockchain.mjs'

import handleError from './middleware/handleError.mjs'
import blockchainRouter from './routes/blockchain-routes.mjs'

const app = express()

app.use(express.json())

app.use('/api/v1/blockchain', blockchainRouter)

app.all('*', (req, res, next) => {
    next(new Error(`Something wrong at ${req.originalUrl}`))
})

app.use(handleError)

const PORT = 5001

app.listen(PORT, () => console.log('Server up on port ' + PORT))