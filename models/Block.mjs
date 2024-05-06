import { generateHash } from "../utilities/crypto-util.mjs"

export default class Block{
    constructor(index, timestamp, previousHash = '', data){
        this.index = index,
        this.timestamp = timestamp,
        this.previousHash = previousHash,
        this.data = data,
        this.hash = this.calculateHash()
    }

    calculateHash(){
        const hashString = this.index + this.previousHash + this.timestamp.toString() + JSON.stringify(this.data)
        console.log(hashString)

        return generateHash(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data))
    }
}