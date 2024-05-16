import Blockchain from "../models/Blockchain.mjs";
import { loadJson, saveJson } from "../data/fileManager.mjs";

export const blockchain = new Blockchain()

export const initChain = async () => {

    const chainJson = await loadJson()
    if(chainJson === '') saveJson(blockchain.chain)
    else blockchain.chain = [...JSON.parse(chainJson)]

}

