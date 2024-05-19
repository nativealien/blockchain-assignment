import { blockchain } from "../utilities/initiate-node.mjs"
import { saveJson } from "../utilities/file-utilities.mjs"

const getBlockchain = (req, res, next) => { 
    res.status(200).json({ statusCode: res.statusCode, message: 'Blockchain fetch successfull!', data: blockchain.chain })
}
const getIdBlock = (req, res, next) => {
    const id = req.params.id
    const block = blockchain.chain.filter( item => item.id === +id)
    res.status(200).json({ statusCode: res.statusCode, message: `Block with id ${id} recieved!`, data: block })
}
const mineBlock = async (req, res, next) => {
    const data = req.body
    if(Object.keys(data).length !== 0){
        const block = blockchain.addBlock(data)
        await res.status(201).json({ statusCode: res.statusCode, message: 'New block mined successfully!', data: data })
        blockchain.nodes.forEach( async url => {
            console.log(url)
            try{
                await fetch(`${url}/api/v1/blockchain/block/broadcast`, {
                    method: 'POST',
                    body: JSON.stringify({block}),
                    headers:{
                        'Content-Type': 'application/json'
                    }
                })
            } catch(err){
                console.log('ERROR')
                next()
            }
        })
    }else next(res.status(500).json(new Error("The request you sent was empty...") ))
    saveJson('/data/blockchain/chain.json', blockchain.chain)
}
const updateChain = (req, res, next) => {
    const block = req.body.block;
    const lastBlock = blockchain.getLastBlock()
    const hash = lastBlock.hash === block.preHash
    const id = lastBlock.id + 1 === block.id

    console.log('updated chain', hash, id)
    if(hash && id){
        blockchain.chain.push(block);
        res.status(201).json({statusCode: 201, message: 'Chain updated', data: block})
    }else{
        res.status(500).json({success: false, statusCode: 500, data:{ message: 'Rejected'}})
    }
}

const syncChain = (req, res, next) => {
    console.log('syncChain')
    const chainLength = blockchain.chain.length
    let maxLength = chainLength
    let longestChain = null

    blockchain.nodes.forEach( async node => {
        const response = await fetch(`${node}/api/v1/blockchain`)
        if(response.ok){
            const result = await response.json();
            console.log(node, result.data.length, maxLength)
            if(result.data.length > maxLength){
                maxLength = result.data.chain.length;
                longestChain = result.data.length
            }
            if(!longestChain || longestChain && !blockchain.validateChain(longestChain)){
                console.log('Chains are in sync')
            }else {
                blockchain.chain = longestChain
            }
        }
    })

    res.status(200).json({successCode: 200, data: {message: 'Chains are synced.'}})
}

export { getBlockchain, getIdBlock, mineBlock, updateChain, syncChain }