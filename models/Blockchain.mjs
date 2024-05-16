import Block from "./Block.mjs";

export default class Blockchain{
    constructor(){
        this.chain = [Block.genesis];
        this.nodes = [];
        this.url = process.argv[3]
    }
    addBlock(data){
        const block = Block.mineBlock({ lastBlock: this.chain.at(-1), data: data });
        this.chain.push(block)
    }

    getLastBlock(){
        return this.chain[0]
    }

    replaceChain(chain){
        if(chain.length <= this.chain.length) return this.chain
        if(!Blockchain.validateChain(chain)) return this.chain

        this.chain = chain
        // console.log('Replace: ', this.chain)
        return this.chain

    }

    static validateChain(chain) {
        if (JSON.stringify(chain.at(0)) !== JSON.stringify(Block.genesis)) return false;
    
        for (let i = 1; i < chain.length; i++) {
          const { date, preHash, hash, data, nonce, diff } = chain.at(i);
          const currentLastHash = chain[i - 1].currentHash;
    
          if (preHash !== currentLastHash) return false;
    
          const validHash = createHash(
            date,
            preHash,
            nonce,
            difficulty,
            data
          );
          if (hash !== validHash) return false;
        }
        return true;
    }
}