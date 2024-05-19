import Blockchain from "../models/Blockchain.mjs";
import { loadJson, saveJson } from "../data/fileManager.mjs";

export const blockchain = new Blockchain()

export const initChain = async () => {

    const nodesJson = await loadJson('/data/nodes/urls.json')
    const nodes = [...nodesJson]
    const urls = nodes[0].nodes
    blockchain.nodes = urls.filter( url => url !== blockchain.url)
    console.log(blockchain.nodes)

    const chainJson = await loadJson('/data/blockchain/chain.json')
    const newChain = blockchain.replaceChain(chainJson)

    if(chainJson === '' || chainJson.length === 0) saveJson('/data/blockchain/chain.json', blockchain.chain)
    else blockchain.chain = [...chainJson]

}
