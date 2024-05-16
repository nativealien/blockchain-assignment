import express from 'express';

import { getBlockchain, getIdBlock, mineBlock, updateChain } from '../controllers/blockController.mjs';

export const blockRouter = express.Router()

blockRouter.route('/').get(getBlockchain)
blockRouter.route('/block/:id').get(getIdBlock)
blockRouter.route('/block/mine').post(mineBlock)
blockRouter.route('/block/broadcast').post(updateChain)