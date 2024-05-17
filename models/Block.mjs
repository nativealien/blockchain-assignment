import hexToBinary from 'hex-to-binary';
import { GENESIS_DATA, MINE_RATE } from "../config/settings.mjs";
import { hashString } from '../utilities/utils.mjs';

export default class Block{
    constructor({ id, date, preHash, hash, nonce, diff, data }){
        this.id = id;
        this.date = date;
        this.preHash = preHash;
        this.hash = hash;
        this.nonce = nonce;
        this.diff = diff;
        this.data = data;
    }

    static get genesis() { return new this( GENESIS_DATA )}

    static mineBlock({lastBlock, data}){
        return Block.proofOfWork( lastBlock, data)
    }

    static proofOfWork = (lastBlock, data) => {
        const id = lastBlock.id + 1
        const preHash = lastBlock.hash
        let { diff } = lastBlock
        let hash, date;
        let nonce = 0;
        do {
            nonce++;
            date = Date.now();
            diff = Block.adjustDifficultyLevel({ block: lastBlock, date });
            hash = hashString( date, preHash, nonce, diff, data )
        } while (
            hexToBinary(hash).substring(0, diff) !== '0'.repeat(diff)
        )
        return new this({ id, date, preHash, hash, nonce, diff, data })
    }

    static adjustDifficultyLevel({ block, date }) {
        const { diff } = block;
        if (date - block.date > MINE_RATE) return diff - 1;
        return diff + 1;
      }
}