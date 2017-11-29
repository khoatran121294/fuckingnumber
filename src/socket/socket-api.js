import io from 'socket.io-client'
let _socket = io('http://localhost:8080')

export const socket = _socket