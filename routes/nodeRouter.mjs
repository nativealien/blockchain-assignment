import express from 'express';
import { getNodes, registerNode } from '../controllers/nodeController.mjs';

export const nodeRouter = express.Router();

nodeRouter.route('/').get(getNodes);
nodeRouter.route('/register').post(registerNode)
