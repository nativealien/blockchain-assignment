import Block from "./Block.mjs"

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

    addBlock(timestamp, preBlockHash, data){
        const block = new Block(this.chain.length + 1, timestamp, preBlockHash, data)
        
        this.chain.push(block)

        return block
    }
}