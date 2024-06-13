const prompt = require("prompt-sync")({ sigint: true })

const tiles = {
  hat: "^",
  hole: "O",
  fieldCharacter: "░",
  pathCharacter: "*",
}

class Field {
  constructor(field = [[]]) {
    this.field = field
    this.playerLocation = {
      x: 0,
      y: 0,
    }
    this.field[0][0] = tiles.pathCharacter
  }

  run() {
    let playing = true

    while (playing) {
      console.clear()

      this.print()
      this.askQuestion()

      if (!this.isInBounds()) {
        console.log("Out of bounds instruction!")
        playing = false
        break
      } else if (this.isHole()) {
        console.log("Sorry, you fell down a hole!")
        playing = false
        break
      } else if (this.isHat()) {
        console.log("Congrats, you found your hat!")
        playing = false
        break
      }

      this.field[this.playerLocation.y][this.playerLocation.x] =
        tiles.pathCharacter
    }
  }

  askQuestion() {
    const answer = prompt("Which way? ").toUpperCase()

    switch (answer) {
      case "U":
        this.playerLocation.y--
        break
      case "D":
        this.playerLocation.y++
        break
      case "L":
        this.playerLocation.x--
        break
      case "R":
        this.playerLocation.x++
        break
      default:
        console.log("Enter U, D, L or R.")
        this.askQuestion()
        break
    }
  }

  isInBounds() {
    return (
      this.playerLocation.y >= 0 &&
      this.playerLocation.x >= 0 &&
      this.playerLocation.y < this.field.length &&
      this.playerLocation.x < this.field[0].length
    )
  }

  isHat() {
    return (
      this.field[this.playerLocation.y][this.playerLocation.x] === tiles.hat
    )
  }

  isHole() {
    return (
      this.field[this.playerLocation.y][this.playerLocation.x] === tiles.hole
    )
  }

  print() {
    const fieldDisplay = this.field.map((row) => row.join("")).join("\n")
    console.log(fieldDisplay)
  }

  static generateField(w = 10, h = 10, percentageHoles = 0.1) {
    const field = Array.from({ length: h }, () =>
      Array.from({ length: w }, () =>
        Math.random() > percentageHoles ? tiles.fieldCharacter : tiles.hole
      )
    )

    const hatLocation = {
      x: Math.floor(Math.random() * w),
      y: Math.floor(Math.random() * h),
    }

    while (hatLocation.x === 0 && hatLocation.y === 0) {
      hatLocation.x = Math.floor(Math.random() * w)
      hatLocation.y = Math.floor(Math.random() * h)
    }

    field[hatLocation.y][hatLocation.x] = tiles.hat

    return field
  }
}

const myField = new Field(Field.generateField())

myField.run()
