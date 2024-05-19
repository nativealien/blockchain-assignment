import Block from "./Block.mjs";
import { hashString } from "../utilities/crypto-utilities.mjs";

export default class Blockchain{
    constructor(){
        this.chain = [Block.genesis];
        this.nodes = [];
        this.url = process.argv[3]
    }
    addBlock(data){
        const block = Block.mineBlock({ lastBlock: this.chain.at(-1), data: data });
        this.chain.push(block)
        return block
    }

    getLastBlock(){
        return this.chain.at(-1)
    }
    
    replaceChain(chain){
        const check = Blockchain.validateChain(chain)
        if(chain.length <= this.chain.length) return this.chain
        if(!check) return this.chain
        this.chain = chain
    }

    static validateChain(chain) {
        if(chain === typeof {}) return false
        if (JSON.stringify(chain.at(0)) !== JSON.stringify(Block.genesis)) return false;
        for (let i = 1; i < chain.length; i++) {
            const { date, preHash, hash, data, nonce, diff } = chain.at(i);
            const currentLastHash = chain[i - 1].hash;
            if (preHash !== currentLastHash) return false;
            const validHash = hashString(
                date,
                preHash,
                nonce,
                diff,
                data
            );
            if (hash !== validHash) return false;
        }
        return true;
    }
}