import Block from "./Block.mjs"
import { generateHash } from "../utilities/crypto-util.mjs"

export default class Blockchain{
    constructor(){
        this.chain = [this.genesisBlock()]
        this.nodes = []
        this.nodeUrl = process.argv[3]
    }

    genesisBlock(){
        return new Block(0, Date.now(), 0, ['genesisblock'])
    }

    getLatestBlock(){
        return this.chain.at(-1)
    }

    addBlock(timestamp, preBlockHash, currBlockHash, data){
        const block = new Block(this.chain.length + 1, timestamp, preBlockHash, currBlockHash, data)
        
        this.chain.push(block)

        return block
    }

    hashBlock(timestamp, preBlockHash, currBlockHash) {
        const hashString = timestamp.toString + preBlockHash + JSON.stringify(currBlockHash)
        const hash = generateHash(hashString)
        return hash
    }

    validateChain(blockchain) {
        let valid = true;

        for( let i = 1; i < blockchain.length; i++){
            const block = blockchain[i]
            const preBlock = blockchain[ i - 1 ]

            console.log('validateCHain: ', block)
        }
    }
}