import { blockchain } from "../utilities/start-chain.mjs";

const getBlockchain = (req, res, next) => {
    res.status(200).json({ success: true, data: blockchain.chain})
}

export { getBlockchain }