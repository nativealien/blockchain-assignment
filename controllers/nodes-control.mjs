import { blockchain } from "../utilities/start-chain.mjs";

const listNodes = (req, res, next) => {
    res.status(200).json( {sucsess: true, data: blockchain.nodes})
}

const registerNode = (req, res, next) => {
    const node = req.body
    console.log('Register nodeUrl: ', blockchain.nodeUrl, 'Node: ', node)
    res.end()
}

export { listNodes, registerNode }