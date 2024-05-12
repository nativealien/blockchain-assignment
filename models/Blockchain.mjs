import Block from "./Block.mjs"
import { generateHash } from "../utilities/crypto-util.mjs"

export default class Blockchain{
    constructor(){
        this.chain = [this.genesisBlock()]
        this.nodes = []
        this.nodeUrl = process.argv[3]
    }

    genesisBlock(){
        return new Block(1, Date.now(), '0', '0', ['genesisblock'])
    }

    getLatestBlock(){
        return this.chain.at(-1)
    }

    addBlock(timestamp, previousHash, currentHash, data){
        const block = new Block(this.chain.length + 1, timestamp, previousHash, currentHash, data)
        
        this.chain.push(block)

        return block
    }

    hashBlock(timestamp, previousHash, currentHash, nonce, difficulty) {
        const hashString = timestamp.toString + previousHash + JSON.stringify(currentHash) + nonce + difficulty
        const hash = generateHash(hashString)
        return hash
    }

    validateChain(blockchain) {
        let valid = true;

        for( let i = 1; i < blockchain.length; i++){
            const block = blockchain[i]
            const preBlock = blockchain[ i - 1 ]

            const hash = this.hashBlock(block.timestamp, preBlock.currentHash, block.data)

            console.log(hash)
            console.log(block.currentHash)

            if(hash !== block.currentHash) valid = false
            if(block.previousHash !== preBlock.currentHash) valid = false
        }
        console.log('Is valid: ', valid)
        return valid
    }
}