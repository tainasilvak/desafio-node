const express = require('express')
const uuid = require('uuid')
const api = express()
const port = 2001
api.use(express.json())

const orders = []

const checkUserId = (request, response, next) => {
        const {id} = request.params
        const index = orders.findIndex(ordered => ordered.id === id)

        if(index < 0) {
            return response.status(404).json({error: "Order not found"})
        }

        request.userIndex = index
        request.userId = id

        next()

}

const methodAndURL = (request, response, next) => {
    const method = request.method
    const URL = request.url 

    console.log(`O método dessa requisão é ${method} e a URL é ${URL}`)

    next()

}

api.post('/order', methodAndURL, (request, response) => {
    const {order, clientName, price} = request.body

    const newOrder = {id: uuid.v4(), order, clientName, price, status: 'Em preparação'}
    
    orders.push(newOrder)

    return response.status(201).json(newOrder)
})

api.get('/order', methodAndURL, (request, response) => {
    return response.json(orders)
})

api.put('/order/:id', checkUserId, methodAndURL, (request, response) => {
    const { order, clientName, price} = request.body
    const index = request.userIndex
    const id = request.userId

    const updadeOrder = {id, order, clientName, price}

    orders[index] = updadeOrder

    return response.json(updadeOrder)
})

api.delete('/order/:id', checkUserId, methodAndURL, (request, response) => {
    const id = request.userId 
    const index = request.userIndex

    orders.splice(index, 1)

    return response.status(204).json()

})

api.get('/order/:id', checkUserId, methodAndURL, (request, response) => {
    const id = request.userId

    const orderFound = orders.find(ordered => ordered.id === id)

    if(orderFound < 0) {
        return response.status(404).json({error: "Order not found"})
    }

    return response.json(orderFound)

})

api.patch('/order/:id', checkUserId, methodAndURL, (request, response) => {
    const { order, clientName, price} = request.body
    const index = request.userIndex
    const id = request.userId
 

    const updateOrder = {id, order, clientName, price, status: "Pronto"}

    orders[index] = updateOrder


    return response.json(updateOrder)

})

api.listen(port, () => {
    console.log(`🚀 Servidor rodando com sucesso na porta ${port}`)
})