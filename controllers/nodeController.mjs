import { Res } from "../data/eventLogger.mjs"
import { blockchain } from "../utilities/initiate.mjs"

const getNodes = (req, res, next) => {
    res.status(200).json(blockchain.nodes)
}
const registerNode = (req, res, next) => {
    
}

export { getNodes, registerNode }