const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser');
const http = require('http').Server(app)
const io = require('socket.io')(http)
const PORT = 8080

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use('/static', express.static(path.join(__dirname, './build/static')))
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, './build/index.html'))
})

app.post('/login', function (req, res) {
    const user = req.body
    console.log(req)
    if ('admin' === user.username && '123456' === user.password) {
        res.send(true)
    }
    res.send(false)
})

http.listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}!`)
})


let currentUsers = []
let range = 10
let timesToOpen = 10
let fuckingUsers = []

//socket transaction here
io.on('connection', function (socket) {
    console.log(`[LOG] - new socket is connected: ${socket.id}.`)

    currentUsers.push({
        id: socket.id
    })
    io.sockets.emit('server:send_current_users', currentUsers)

    socket.on('disconnect', function () {
        console.log(`[LOG] - socket ${socket.id} is disconnected.`)
        currentUsers = currentUsers.filter(user => user.id !== socket.id)
        console.log(currentUsers)
        socket.broadcast.emit('server:send_current_users', currentUsers)
    })

    // receive number and send to every users
    socket.on("client:open_number", function (_number) {
        console.log("[LOG] - client " + socket.id + " is send " + _number + " to admin")
        io.sockets.emit("server:send_opened_number", _number)
    })

    socket.on("client:new_game", function () {
        console.log("[LOG] - start new game ..")
        io.sockets.emit("server:new_game_all")
        fuckingUsers = []
    })

    socket.on("client:fucking_user", function (userId) {
        console.log("[LOG] - fucking user: " + userId)
        fuckingUsers.push(userId)
        io.sockets.emit("server:fucking_users", fuckingUsers)
    })
})

