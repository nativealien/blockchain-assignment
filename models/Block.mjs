
export default class Block{
    constructor(index, timestamp, previousHash, currentHash, data, nonce, difficulty){
        this.index = index,
        this.timestamp = timestamp,
        this.previousHash = previousHash,
        this.currentHash = currentHash,
        this.data = data,
        this.nonce = nonce
        this.difficulty = difficulty
    }
}