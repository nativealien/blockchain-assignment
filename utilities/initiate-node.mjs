import Blockchain from "../models/Blockchain.mjs";
import { loadJson, saveJson } from "./file-utilities.mjs";

export const blockchain = new Blockchain();

export const initNode = async () => {
  const nodesJson = await loadJson("/data/nodes/urls.json");
  const nodes = [...nodesJson];
  const urls = nodes[0].nodes;
  blockchain.nodes = urls.filter((url) => url !== blockchain.url);

  const chainJson = await loadJson("/data/blockchain/chain.json");
  if (chainJson.length > blockchain.chain.length) {
    blockchain.chain = chainJson;
  }
};
