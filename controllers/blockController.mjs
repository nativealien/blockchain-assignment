import { Res } from "../data/eventLogger.mjs"
import Block from "../models/Block.mjs"
import { blockchain } from "../utilities/initiate.mjs"
import { saveJson } from "../data/fileManager.mjs"

const initBlockchain = (req, res, next) => {

}
const getBlockchain = (req, res, next) => { 
    res.status(200).json(blockchain.chain)
}
const getBlock = (req, res, next) => {

}
const mineBlock = (req, res, next) => {
    const data = req.body
    console.log(data)
    blockchain.addBlock(data)
    const result = res.status(201).json({data: data})
    console.log(result)
    if(result) saveJson(blockchain.chain)
}
const updateChain = (req, res, next) => {

}

export { getBlockchain, initBlockchain, getBlock, mineBlock, updateChain }