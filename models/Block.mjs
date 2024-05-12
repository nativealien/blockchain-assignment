
export default class Block{
    constructor(index, timestamp, previousHash, currentHash, data){
        this.index = index,
        this.timestamp = timestamp,
        this.previousHash = previousHash,
        this.currentHash = currentHash,
        this.data = data
    }
}