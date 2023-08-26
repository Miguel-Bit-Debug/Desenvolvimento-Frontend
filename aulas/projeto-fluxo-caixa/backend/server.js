const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const port = 8050
const connectionString = "mongodb+srv://admin:admin123@appdatabase.ry0gm2w.mongodb.net/"
const Pagamento = require('./models/pagamento')

app.use(express.json())
app.use(cors())

app.get("/listar-saldo-consolidado", async (req, res) => {
    try {
        let dataReferencia = req.query.dataReferencia
        let pagamentos = await Pagamento.find({ dataPagamento: dataReferencia })
        let saldoConsolidadoDia = 0

        for (let pagamento of pagamentos) {
            saldoConsolidadoDia += pagamento.valorPagamento
        }

        return res.status(200).json({ pagamentos, saldoConsolidadoDia })
    } catch (error) {
        return res.status(500).json(error)
    }
})

app.get("/listar-pagamentos", async (req, res) => {
    try {
        let pagamentos = await Pagamento.find()

        return res.status(200).json(pagamentos)
    } catch (error) {
        return res.status(500).json(error)
    }
})

app.post("/cadastrar-pagamento", async (req, res) => {
    let pagamento = { ...req.body }

    let pagamentoValido = pagamento.tipoPagamento.toUpperCase() != 'C' && pagamento.tipoPagamento.toUpperCase() != "D"

    if (pagamentoValido) {
        return res.status(400).json('pagamento invalido')
    }

    try {
        await Pagamento.create(pagamento)
        return res.status(201).json("Pagamento cadastrado com sucesso!")
    } catch (error) {
        return res.status(500).json(error)
    }
})

mongoose.connect(connectionString, {
    dbName: "DevsSupermarket"
}).then(() => {
    console.log("MongoDB UP!")
    console.log(`Listening on http://localhost:${port}`)
    app.listen(port)
}).catch((error) => {
    console.log(error)
})
