import express from 'express'

import { listNodes, registerNode } from '../controllers/nodes-control.mjs'

const nodeRouter = express.Router()

nodeRouter.route('/').get(listNodes)
nodeRouter.route('/register').post(registerNode)

export default nodeRouter