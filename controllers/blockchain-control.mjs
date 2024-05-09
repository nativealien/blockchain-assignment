import { blockchain } from "../utilities/start-chain.mjs";

const getBlockchain = (req, res, next) => {
    res.status(200).json({ success: true, data: blockchain})
}

const createBlock = (req, res, next) => {
    const timestamp = Date.now();
    const latestBlock = blockchain.getLatestBlock();
    const data = req.body;

    const result = blockchain.addBlock(timestamp, latestBlock.hash, data)

    res.status(200).json( { success: true, data: result} )
}

const syncChain = (req, res, next) => {
    const chainLength = blockchain.chain.length

    let maxLength = chainLength
    let longestChain = null

    console.log(blockchain.nodes)
    blockchain.nodes.forEach( async node => {
        const res = await fetch(`${node}/api/v1/blockchain`)
        if(res.ok){
            const result = await res.json()
            if(result.data.chain.length > maxLength){
                        maxLength = result.data.chain.length
                        longestChain = result.data.chain
                    }
        }
        //     const result = await res.json()

        //     console.log('Sync chain: ', result.data.chain.length)

        //     if(result.data.chain.length > maxLength){
        //         maxLength = result.data.chain.length
        //         longestChain = result.data.chain
        //     }

        //     blockchain.validateChain(longestChain)

        // }else{
        //     console.log('NOT OK!')
        // }
    })

    res.end()
}

export { getBlockchain, createBlock, syncChain }