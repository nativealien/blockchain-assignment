import express from 'express'

const app = express()

app.use(express.json())

app.use('/api/v1/blockchain', (req, res) => {
    res.json({message: "Welcome to my blockchain!"})
})

const PORT = 5001

app.listen(PORT, () => console.log('Server up on port ' + PORT))