import { blockchain } from "../utilities/start-chain.mjs";
import { writeFileAsync } from "../utilities/files-utils.mjs";

const getBlockchain = (req, res, next) => {
    res.status(200).json({ success: true, data: blockchain})
}

const createBlock = (req, res, next) => {
    // const timestamp = Date.now();
    const latestBlock = blockchain.getLatestBlock();
    const data = req.body;
    const { nonce, difficulty, timestamp } = blockchain.proofOfWork( latestBlock.currentHash, data )

    const currBlockHash = blockchain.hashBlock(timestamp, latestBlock.currentHash, data, nonce, difficulty)

    const result = blockchain.addBlock(timestamp, latestBlock.currentHash, currBlockHash, data, nonce, difficulty)

    // writeFileAsync('data', 'blockchain.json', JSON.stringify(blockchain.chain))

    blockchain.nodes.forEach( async node => {
        // New endpoint /api/vi/blockchain/block/broadcast
        const body = result;

        await fetch(`${node}/api/v1/blockchain/block/broadcast`,{
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    })

    res.status(200).json( { success: true, data: result} )
    
}

const updateChain = (req, res, next) => {
    const block = req.body;
    const lastBlock = blockchain.getLatestBlock();

    const hash = lastBlock.currentHash === block.previousHash
    const index = lastBlock.index + 1 === block.index

    if(hash && index ){
        blockchain.chain.push(block)
        res.status(201).json({
            success: true,
            statusCode: 201,
            data: {
                message: 'Block added and transfered'
            }
        })
    }else{
        res.status(500).json({ success: false, statusCode: 500, data: {message: 'Block denied...'}})
    }
}

const syncChain = (req, res, next) => {
    const chainLength = blockchain.chain.length
    let maxLength = chainLength
    let longestChain = null

    blockchain.nodes.forEach( async node => {
        const res = await fetch(`${node}/api/v1/blockchain`)
        if(res.ok){
            const result = await res.json()
            if(result.data.chain.length > maxLength){
                maxLength = result.data.chain.length
                longestChain = result.data.chain
            }
            
            if(longestChain && blockchain.validateChain(longestChain)){
                blockchain.chain = longestChain
            }else{
                console.log('Chains are in sync.')
            }
        }
    })
    
    res.status(200).json({ success: true, statusCode: 200, data: {message: 'Sync done!'}})
}

export { getBlockchain, createBlock, syncChain, updateChain}