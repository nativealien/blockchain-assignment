import { blockchain } from "../utilities/start-chain.mjs";

const getBlockchain = (req, res, next) => {
    res.status(200).json({ success: true, data: blockchain})
}

const createBlock = (req, res, next) => {
    const timestamp = Date.now();
    const latestBlock = blockchain.getLatestBlock();
    const data = req.body;

    const currBlockHash = blockchain.hashBlock(timestamp, latestBlock.currentHash, data)

    const result = blockchain.addBlock(timestamp, latestBlock.currentHash, currBlockHash, data)

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
            
            console.log('One: ', result.data.chain.length, maxLength, longestChain)
            if(longestChain && blockchain.validateChain(longestChain)){
                blockchain.chain = longestChain
            }else{
                console.log('Chains are in sync.')
            }
            console.log(blockchain.chain)
        }
    })
    
    res.status(200).json({ success: true, statusCode: 200, data: {message: 'Sync done!'}})
}

export { getBlockchain, createBlock, syncChain }