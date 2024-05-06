import express from 'express'

import { createBlock, getBlockchain } from '../controllers/blockchain-control.mjs'

const blockchainRouter = express.Router()

blockchainRouter.route('/').get(getBlockchain)
blockchainRouter.route('/mine').post(createBlock)

export default blockchainRouter