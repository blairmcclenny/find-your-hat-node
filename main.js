const prompt = require("prompt-sync")({ sigint: true })

const tiles = {
  hat: "^",
  hole: "O",
  fieldCharacter: "░",
  pathCharacter: "*",
}

class Field {
  constructor(field) {
    this.field = field
    this.playerPosition = {
      x: 0,
      y: 0,
    }
  }

  static generateField(w = 8, h = 16, percentageHoles = 0.3) {
    const field = Array.from({ length: h }, () =>
      Array(w).fill(tiles.fieldCharacter)
    )

    function setPlayerPosition() {
      const playerPosition = {
        x: 0,
        y: 0,
      }

      field[playerPosition.y][playerPosition.x] = tiles.pathCharacter
    }

    function setHatPosition() {
      const hatPosition = {
        x: Math.floor(Math.random() * w),
        y: Math.floor(Math.random() * h),
      }

      if (hatPosition.x === 0 && hatPosition.y === 0) {
        return setHatPosition()
      }

      field[hatPosition.y][hatPosition.x] = tiles.hat
    }

    function setHolePositions() {
      const numHoles = Math.floor(w * h * percentageHoles)

      for (let i = 0; i < numHoles; i++) {
        const holePosition = {
          x: Math.floor(Math.random() * w),
          y: Math.floor(Math.random() * h),
        }

        if (
          (holePosition.x === 0 && holePosition.y === 0) ||
          field[holePosition.y][holePosition.x] === tiles.hole ||
          field[holePosition.y][holePosition.x] === tiles.hat
        ) {
          i--
        }

        field[holePosition.y][holePosition.x] = tiles.hole
      }
    }

    setPlayerPosition()
    setHatPosition()
    setHolePositions()

    return field
  }

  updateField() {
    const { x, y } = this.playerPosition

    if (this.field[y] && this.field[y][x]) {
      this.field[y][x] = tiles.pathCharacter
    }
  }

  print() {
    const grid = this.field
      .map((row, i, arr) => `${row.join("")}${i < arr.length - 1 ? "\n" : ""}`)
      .join("")

    console.log(grid)
  }

  status() {
    const { x, y } = this.playerPosition
    const tile = this.field[y] && this.field[y][x]

    const response = {
      active: true,
      message: "On the field",
    }

    function getMessage(tile) {
      if (!tile) return "Oops! You left the field"

      switch (tile) {
        case tiles.hole:
          return "Oh no! You fell in a hole"
        case tiles.hat:
          return "Congrats! You found the hat!"
        default:
          return "On the field"
      }
    }

    if (!tile || tile === tiles.hole || tile === tiles.hat) {
      response.active = false
      response.message = getMessage(tile)
    }

    return response
  }

  move() {
    let input = prompt("Which way? ")

    switch (input.toLowerCase()) {
      case "u":
        this.playerPosition.y--
        break
      case "d":
        this.playerPosition.y++
        break
      case "l":
        this.playerPosition.x--
        break
      case "r":
        this.playerPosition.x++
        break
      default:
        input = prompt(
          'Please enter up("u"), down("d"), left("l"), right("r")? '
        )
    }
  }

  run() {
    while (this.status().active) {
      this.updateField()
      console.clear()
      this.print()
      this.move()
    }

    console.clear()
    console.log(this.status().message)
  }
}

const myField = new Field(Field.generateField())
myField.run()
