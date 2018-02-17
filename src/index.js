const fieldHeight = 400
const fieldWidth = 500
const numberOfRows = 3
const tilesInRow = 10
const sizeOfGap = 5

const requestAnimationFrame = window.requestAnimationFrame

  class Tile {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.isAlive = true
  }

  getStatus() {
    return this.isAlive
  }

  destroy() {
    this.isAlive = false
  }

  draw(ctx) {
    ctx.fillStyle = 'rgba(0, 0, 200, 0.5)'
    ctx.fillRect(
      this.x,
      this.y,
      Tile.width,
      Tile.height,
    )
  }
}

Tile.width = fieldWidth / tilesInRow - 2 * sizeOfGap
Tile.height = 20

const generateTiles = (tiles) => {
  for (let i = 0; i < numberOfRows; i++) {
    tiles[i] = []
    for (let j = 0; j < tilesInRow; j++) {
      const x = (2 * j + 1) * sizeOfGap + j * Tile.width
      const y = (2 * i + 1) * sizeOfGap + i * Tile.height
      tiles[i][j] = new Tile(x, y)
    }
  }
}

const drawTiles = (tiles, ctx) => {
  for (let i = 0; i < numberOfRows; i++) {
    for (let j = 0; j < tilesInRow; j++) {
      tiles[i][j].draw(ctx)
    }
  }
}

class Platform {
  constructor() {
    this.x = (fieldWidth - Platform.width) / 2
    this.y = fieldHeight - Platform.height
  }

  draw(ctx) {
    ctx.fillStyle = Platform.color
    ctx.fillRect(
      this.x,
      this.y,
      Platform.width,
      Platform.height,
    )
  }
}

Platform.width = 100
Platform.height = 10
Platform.color = '#ff0000'

window.onload = () => {
  const canvas = document.getElementById('tutorial')
  const ctx = canvas.getContext('2d')

  const tiles = []

  generateTiles(tiles)
  drawTiles(tiles, ctx)

  const platform = new Platform()
  platform.draw(ctx)
}
