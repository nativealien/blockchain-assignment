import { blockchain } from "../utilities/start-chain.mjs";

const getBlockchain = (req, res, next) => {
    res.status(200).json({ success: true, data: blockchain.chain})
}

const createBlock = (req, res, next) => {
    const timestamp = Date.now();
    const latestBlock = blockchain.getLatestBlock();
    const data = req.body;

    const result = blockchain.addBlock(timestamp, latestBlock.hash, data)

    res.status(200).json( { success: true, data: result} )
}

export { getBlockchain, createBlock }