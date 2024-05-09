import express from 'express'

import { createBlock, getBlockchain, syncChain } from '../controllers/blockchain-control.mjs'

const blockchainRouter = express.Router()

blockchainRouter.route('/').get(getBlockchain)
blockchainRouter.route('/mine').post(createBlock)
blockchainRouter.route('/consensus').get(syncChain)

export default blockchainRouter