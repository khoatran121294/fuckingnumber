class FunctionUltils {

  static randomNumberInRange(range = 10) {
    return Math.floor(Math.random() * (range)) + 1
  }

  static initEmptyNumbers(size = 5) {
    const numbers = new Array(size)
    for (let i = 0; i < size; i++) {
      numbers[i] = new Array(size)
    }
    return numbers
  }

  static initDataOnBoard(size = 5, range = 10) {
    const numbers = this.initEmptyNumbers(size)
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        numbers[i][j] = this.randomNumberInRange(range)
      }
    }
    return numbers
  }
}

export default FunctionUltils