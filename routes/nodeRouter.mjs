import express from 'express';

const nodeRouter = express.Router();

nodeRouter.route('/').get(getNodes);
nodeRouter.route('/register').post(regNode)