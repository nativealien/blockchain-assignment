import express from 'express'

const blockchainRouter = express.Router()

blockchainRouter.route('/')
    .get( (req, res, next) => {
        res.json({message: 'Welcome to my routed Blockchain'})
    })

export default blockchainRouter