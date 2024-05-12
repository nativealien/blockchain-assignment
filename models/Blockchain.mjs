import { DIFFICULTY, MINE_RATE } from "../config/config.mjs"
import Block from "./Block.mjs"
import { generateHash } from "../utilities/crypto-util.mjs"


export default class Blockchain{
    constructor(){
        this.chain = [this.genesisBlock()]
        this.nodes = []
        this.nodeUrl = process.argv[3]
    }

    genesisBlock(){
        return new Block(1, Date.now(), '0', '0', ['genesisblock'], 0, DIFFICULTY)
    }

    getLatestBlock(){
        return this.chain.at(-1)
    }

    addBlock(timestamp, previousHash, currentHash, data, nonce, difficulty){
        const block = new Block(this.chain.length + 1, timestamp, previousHash, currentHash, data, nonce, difficulty)
        
        console.log(block)
        
        this.chain.push(block)

        console.log(this.chain)

        return block
    }

    hashBlock(timestamp, previousHash, data, nonce, difficulty) {
        const hashString = timestamp.toString + previousHash + JSON.stringify(data) + String(nonce) + String(difficulty)
        const hash = generateHash(hashString)
        return hash
    }

    proofOfWork(previousHash, data) {
        const lastBlock = this.getLatestBlock();
        let difficulty, hash, timestamp;
        let nonce = 0;
    
        do {
          nonce++;
          timestamp = Date.now();
    
          difficulty = this.difficultyAdjustment(lastBlock, timestamp);
          hash = this.hashBlock(
            timestamp,
            previousHash,
            data,
            nonce,
            difficulty
          );
        } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));
    
        return { nonce, difficulty, timestamp };
    }

    difficultyAdjustment(lastBlock, currTimestamp) {
        const rate = parseInt(MINE_RATE);
        let { difficulty, timestamp } = lastBlock;

        const timestampDiff = currTimestamp - timestamp
    
        if (difficulty < 1) return 1;

        console.log(timestampDiff, rate)

        if(timestampDiff > rate){
            return +difficulty
        }else{
            return +difficulty
        }

    }
    

    validateChain(blockchain) {
        let valid = true;

        for( let i = 1; i < blockchain.length; i++){
            const block = blockchain[i]
            const preBlock = blockchain[ i - 1 ]

            const hash = this.hashBlock(block.timestamp, preBlock.currentHash, block.data, block.nonce, block.difficulty)

            console.log(hash)
            console.log(block.currentHash)

            if(hash !== block.currentHash) valid = false
            if(block.previousHash !== preBlock.currentHash) valid = false
        }
        console.log('Is valid: ', valid)
        return valid
    }
}