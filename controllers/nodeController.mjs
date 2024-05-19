import { blockchain } from "../utilities/initiate-node.mjs"
import { loadJson, saveJson } from "../utilities/file-utilities.mjs"

const getNodes = (req, res, next) => {
    const nodes = blockchain.nodes
    res.status(200).json({ statusCode: 200, message: 'Nodes recieved.', data: nodes } )
}
const registerNode = async (req, res, next) => {

    const folderPath = '/data/nodes/urls.json'
    
    let message;
    const newUrl = req.body.node
    const urlList = await loadJson(folderPath)
    if(!urlList[0].nodes.includes(newUrl) && newUrl !== undefined){
        urlList[0].nodes.push(newUrl)
        await saveJson(folderPath, urlList)
        message = `Node ${newUrl} added succesfully!`
    }else message = `Node ${newUrl} was already registerd!`

    res.status(201).json({statusCode: 201, message: message})
    
}

export { getNodes, registerNode }