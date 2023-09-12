const express = require('express')
const uuid = require('uuid')
const api = express()
const port = 2001
api.use(express.json())

const orders = []

api.post('/order', (request, response) => {
    const {order, clientName, price} = request.body

    const newOrder = {id: uuid.v4(), order, clientName, price, status: 'Em preparação'}
    
    orders.push(newOrder)

    return response.status(201).json(newOrder)
})

api.get('/order', (request, response) => {
    return response.json(orders)
})

api.put('/order/:id', (request, response) => {
    const {id} = request.params
    const { order, clientName, price} = request.body

    const updadeOrder = {id, order, clientName, price}

    const index = orders.findIndex(ordered => ordered.id === id)

    if(index < 0) {
        return response.status(404).json({message: "Order not found"})
    }

    orders[index] = updadeOrder

    return response.json(updadeOrder)
})

api.delete('/order/:id', (request, response) => {
    const {id} = request.params

    const index = orders.findIndex(ordered => ordered.id === id)

     if(index < 0) {
        return response.status(404).json({message: "Order not found"})
    }

    orders.splice(index, 1)

    return response.status(204).json()

})

api.get('/order/:id', (request, response) => {
    const {id} = request.params

    const orderFound = orders.find(ordered => ordered.id === id)

    if(orderFound < 0) {
        return response.status(404).json({message: "Order not found"})
    }

    return response.json(orderFound)

})

api.patch('/order/:id', (request, response) => {
    const {id} = request.params
    const { order, clientName, price} = request.body
    const index = orders.findIndex(ordered => ordered.id === id)

    const updateOrder = {id, order, clientName, price, status: "Pronto"}

    orders[index] = updateOrder

    if(index < 0) {
        return response.status(404).json({message: "Order not found"})
    }

    return response.json(updateOrder)



    




})


api.listen(port, (request, response) => {
    console.log(`🚀 Servidor rodando com sucesso na porta ${port}`)
})