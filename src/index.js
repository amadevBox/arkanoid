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

  movePlatformByEvent(e) {
    const modifier = 1
    switch(e.keyCode) {
      case 37: {
        this.x -= Platform.speed * modifier
        break
      }
      case 39: {
        this.x += Platform.speed * modifier
        break
      }
    }
  }
}

Platform.width = 100
Platform.height = 10
Platform.color = '#ff0000'
Platform.speed = 10


class Boll {
  constructor() {
    this.x = fieldWidth / 2
    this.y = fieldHeight - Boll.radius - Platform.height
  }

  move() {
    this.x++
    this.y++
  }

  draw(ctx) {
    ctx.beginPath()
    ctx.arc(
      this.x,
      this.y,
      Boll.radius,
      0,
      2 * Math.PI,
      false
    )
    ctx.fillStyle = Boll.color
    ctx.fill()
  }
}

Boll.color = '#00ff00'
Boll.radius = 20


const render = (
  ctx,
  tiles,
  platform,
  boll,
) => {
  ctx.clearRect(0, 0, fieldWidth, fieldHeight)
  drawTiles(tiles, ctx)
  platform.draw(ctx)
  boll.draw(ctx)
  // boll.move()
  requestAnimationFrame(() => render(
      ctx,
      tiles,
      platform,
      boll,
    )
  )
}

window.onload = () => {
  const canvas = document.getElementById('tutorial')
  const ctx = canvas.getContext('2d')

  const tiles = []
  generateTiles(tiles)
  const platform = new Platform()

  const boll = new Boll()

  render(
    ctx,
    tiles,
    platform,
    boll
  )

  addEventListener('keydown', platform.movePlatformByEvent.bind(platform))
}
