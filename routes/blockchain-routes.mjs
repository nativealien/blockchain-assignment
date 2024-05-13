import express from 'express'

import { createBlock, getBlockchain, syncChain, updateChain } from '../controllers/blockchain-control.mjs'

const blockchainRouter = express.Router()

blockchainRouter.route('/').get(getBlockchain)
blockchainRouter.route('/mine').post(createBlock)
blockchainRouter.route('/consensus').get(syncChain)
blockchainRouter.route('/block/broadcast').post(updateChain)

export default blockchainRouter