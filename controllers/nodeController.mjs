import { blockchain } from "../utilities/initiate.mjs"
import { loadJson } from "../data/fileManager.mjs"

const getNodes = (req, res, next) => {
    res.status(200).json({data: blockchain.nodes})
}
const registerNode = (req, res, next) => {
    const newUrl = req.body.node
    

    res.status(201).json({message: 'Hej'})
    
}

export { getNodes, registerNode }