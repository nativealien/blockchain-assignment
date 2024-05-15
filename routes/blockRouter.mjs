import express from 'express';

const blockRouter = express.Router()

blockRouter.route('/').get(getBlockchain)
blockRouter.route('/init').get(initBlockchain)

blockRouter.route('/block/:id').get(getBlock)
blockRouter.route('/block/mine').post(mineBlock)
blockRouter.route('/block/broadcast').post(updateChain)