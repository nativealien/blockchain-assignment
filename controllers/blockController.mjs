import { blockchain } from "../utilities/initiate.mjs"
import { saveJson } from "../data/fileManager.mjs"

const getBlockchain = (req, res, next) => { 
    res.status(200).json(blockchain.chain)
}
const getIdBlock = (req, res, next) => {

}
const mineBlock = async (req, res, next) => {
    const data = req.body
    blockchain.addBlock(data)
    const result = await res.status(201).json({data: data})
    if(result) saveJson('/data/blockchain/chain.json', blockchain.chain)
}
const updateChain = (req, res, next) => {

}

export { getBlockchain, getIdBlock, mineBlock, updateChain }