import { blockchain } from "../utilities/initiate.mjs"
import { saveJson } from "../data/fileManager.mjs"

const getBlockchain = (req, res, next) => { 
    res.status(200).json(blockchain.chain)
}
const getIdBlock = (req, res, next) => {
    const id = req.params.id
    const block = blockchain.chain.filter( item => item.id === +id)
    res.status(200).json({ status: true, statusCode: 200, data: block})
}
const mineBlock = async (req, res, next) => {
    const data = req.body
    const block = blockchain.addBlock(data)
    const result = await res.status(201).json({data: data})
    
    blockchain.nodes.forEach( async url => {
        await fetch(`${url}/api/v1/blockchain/block/broadcast`, {
            method: 'POST',
            body: JSON.stringify({block}),
            headers:{
                'Content-Type': 'application/json'
            }
        })
    })
    saveJson('/data/blockchain/chain.json', blockchain.chain)
}
const updateChain = (req, res, next) => {
    const block = req.body.block;
    const lastBlock = blockchain.getLastBlock()
    const hash = lastBlock.hash === block.preHash
    const id = lastBlock.id + 1 === block.id

    if(hash && index){
        blockchain.push(block);
        res.status(201).json({success: true, statusCode: 201, data: block })
    }else{
        res.status(500).json({success: true, statusCode: 500, data:{ message: 'Rejected', block}})
    }
}

export { getBlockchain, getIdBlock, mineBlock, updateChain }