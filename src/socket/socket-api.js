import io from 'socket.io-client'

export default class Socket {
  static getInstance () {
    if (!this.currentSocket) {
      this.currentSocket = io('http://localhost:8080')
    }
    return this.currentSocket
  }
}