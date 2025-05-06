const express = require('express')
const axios = require('axios')
const cors = require('cors')

const PORT = 3000
const app = express()
app.use(cors())

const url = 'https://rickandmortyapi.com/api/character'

app.get('/characters', async (req, res) => {
    try {
        const response =  await axios.get(url)
        res.json(response.data.results)
    }
    catch (error){
        res.status(404).json({error: 'Error al obtener los personajes'})
    }
})

app.get('/characters/:name', async (req, res) => {
    const name = req.params.name

    try {
        const response = await axios.get(`${url}/?name=${name}`)
        const character = response.data.results
        res.json(character[0])
    } catch (error) {
      res.status(404).json({ error: 'Personaje no encontrado' })
    }
})

app.use((req, res) => {
	res.status(404).send('Página no encontrada')
})

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
})
