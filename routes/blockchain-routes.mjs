import express from 'express'

import { getBlockchain } from '../controllers/blockchain-control.mjs'

const blockchainRouter = express.Router()

blockchainRouter.route('/')
    .get(getBlockchain)

export default blockchainRouter