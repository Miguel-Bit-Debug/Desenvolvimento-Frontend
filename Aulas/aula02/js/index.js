const express = require('express')
const app = express()
const porta = 5000

let produtos = [
    {
        nome: "Bolu de murangu",
        valor: 10000,
        descricao: "Hmmmmm bolo de murangu melhor bolo do mundo",
        imagem: "https://ofner.vtexassets.com/arquivos/ids/157361/bolo-morango.png",
    },
    {
        nome: "Bolo de chocolate",
        valor: 200,
        descricao: "Hmmmmm bolo toooop D+++++",
        imagem: "https://www.estadao.com.br/resizer/oFDrDp3xgfze9zuyNaR5gnyURVA=/arc-anglerfish-arc2-prod-estadao/public/FIVYQFU6J5ND3PYRA6XQHR4NW4.jpg"
    },
    {
        nome: "Bolo de cenoura",
        valor: 300,
        descricao: "Hmmmmm bolo tooop muito bom",
        imagem: "https://www.sabornamesa.com.br/media/k2/items/cache/a82521355ffa5d7455a02ef1e9aeb10d_XL.jpg"
    }
]

app.get('/', function (requisicao, resposta) {
    try {
        return resposta.json(produtos).status(200)
    } catch (error) {
        return resposta.json({ message: "Operação invalida" }).status(400)
    }
})

app.get('/comida', function (requisicao, resposta) {
    return resposta.json({ nome: "macarrão" }).status(200)
})

app.get('/jogos', (requisicao, resposta) => {
    let queryUrl = requisicao.query
    console.log(requisicao.query)

    return resposta.json(queryUrl).status(200)
})

app.listen(porta, () => {
    console.log(`http://localhost:${porta}`)
})
