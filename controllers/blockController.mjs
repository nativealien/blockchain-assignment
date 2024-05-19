import { blockchain } from "../utilities/initiate.mjs"
import { saveJson } from "../data/fileManager.mjs"

const getBlockchain = (req, res, next) => { 
    res.status(200).json(new Res(res.statusCode, 'Blockchain fetch successfull!', blockchain.chain))
}
const getIdBlock = (req, res, next) => {
    const id = req.params.id
    const block = blockchain.chain.filter( item => item.id === +id)
    res.status(200).json(new Res(res.statusCode, `Block with id ${id} recieved!`, block))
}
const mineBlock = async (req, res, next) => {
    const data = req.body
    if(Object.keys(data).length !== 0){
        const block = blockchain.addBlock(data)
        await res.status(201).json(new Res(res.statusCode, 'New block mined successfully!', data))
        blockchain.nodes.forEach( async url => {
            try{
                await fetch(`${url}/api/v1/blockchain/block/broadcast`, {
                    method: 'POST',
                    body: JSON.stringify({block}),
                    headers:{
                        'Content-Type': 'application/json'
                    }
                })
            } catch(err){
                next()
            }
        })
        saveJson('/data/blockchain/chain.json', blockchain.chain)
    }else next(res.status(500).json(new Error("The request you sent was empty...") ))
}
const updateChain = (req, res, next) => {
    const block = req.body.block;
    const lastBlock = blockchain.getLastBlock()
    const hash = lastBlock.hash === block.preHash
    const id = lastBlock.id + 1 === block.id

    if(hash && id){
        blockchain.push(block);
        res.status(201).json({statusCode: 201, message: 'Chain updated', data: block})
    }else{
        res.status(500).json({success: true, statusCode: 500, data:{ message: 'Rejected'}})
    }
}

export { getBlockchain, getIdBlock, mineBlock, updateChain }