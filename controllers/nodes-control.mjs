import { blockchain } from "../utilities/start-chain.mjs";

const listNodes = (req, res, next) => {
    res.status(200).json( {sucsess: true, data: blockchain.nodes})
}

const registerNode = (req, res, next) => {
    const node = req.body

    
    if(blockchain.nodes.indexOf(node.nodeUrl) === -1 && blockchain.nodeUrl !== node.nodeUrl){
        syncNodes(node.nodeUrl)
        blockchain.nodes.push(node.nodeUrl)
        res.status(201).json({ success: true, statusCode: 201, data: {message: `Node ${node.nodeUrl} is regged!`}})
    }else{
        res.status(400).json({ success: true, statusCode: 400, data: {message: `Noden ${node.nodeUrl} is already regged!`}})
    }
}

const syncNodes = (url) => {
    const members = [...blockchain.nodes, blockchain.nodeUrl]
    try {
        members.forEach( async member => {
            const body = { nodeUrl: member}
            console.log('BODY: ', body)

            const response = await fetch(`${url}/api/v1/nodes/register`, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            // console.log('RES', url, response)
        })
    } catch (error) {
        console.log(error)
    }

    console.log(members)
}

export { listNodes, registerNode }