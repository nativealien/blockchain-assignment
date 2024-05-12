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

    res.status(200).json( { success: true, data: result} )
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

export { getBlockchain, createBlock, syncChain }