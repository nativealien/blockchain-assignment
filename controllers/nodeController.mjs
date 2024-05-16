import { blockchain } from "../utilities/initiate.mjs"
import { loadJson, saveJson } from "../data/fileManager.mjs"

const getNodes = (req, res, next) => {
    res.status(200).json({data: blockchain.nodes})
}
const registerNode = async (req, res, next) => {

    const folderPath = '/data/nodes/urls.json'
    const messageObj = { message: ''}

    const newUrl = req.body.node
    const urlList = await loadJson(folderPath)
    if(!urlList[0].nodes.includes(newUrl) && newUrl !== undefined){

        urlList[0].nodes.push(newUrl)
        await saveJson(folderPath, urlList)
        messageObj.message = `Node ${newUrl} added succesfully!`
    }else messageObj.message = `Node ${newUrl} was already registerd!`

    res.status(201).json(messageObj)
    
}

export { getNodes, registerNode }