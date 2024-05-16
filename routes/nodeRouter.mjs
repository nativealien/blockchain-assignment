import express from 'express';

export const nodeRouter = express.Router();

const getNodes = () => {}
const registerNode = () => {}

nodeRouter.route('/').get(getNodes);
nodeRouter.route('/register').post(registerNode)