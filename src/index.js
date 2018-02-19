const fieldHeight = 400
const fieldWidth = 500
const numberOfRows = 3
const tilesInRow = 8
const sizeOfGap = 2.5

const requestAnimationFrame = window.requestAnimationFrame

class Tile {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.isAlive = true
  }

  draw(ctx) {
    if (!this.isAlive) return
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
Tile.height = 15

const generateTiles = () => {
  const tiles = []
  for (let i = 0; i < numberOfRows; i++) {
    tiles[i] = []
    for (let j = 0; j < tilesInRow; j++) {
      const x = (2 * j + 1) * sizeOfGap + j * Tile.width
      const y = (2 * i + 1) * sizeOfGap + i * Tile.height
      tiles[i][j] = new Tile(x, y)
    }
  }
  return tiles
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
Platform.speed = 20


class Boll {
  constructor() {
    this.x = fieldWidth / 2
    this.y = fieldHeight - Boll.radius - Platform.height
    this.angle = Math.random() * Math.PI
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
Boll.radius = 7.5
Boll.speed = 3


const core = (boll, tiles) => {
  if ((boll.y <= Boll.radius) ||
      (boll.y >= fieldHeight - Boll.radius)
     ) {
    Boll.speed *= -1
    boll.angle += Math.PI
    return
  }
  if ((boll.x <= Boll.radius) ||
    (boll.x >= fieldWidth - Boll.radius)
  ) {
    boll.angle += Math.PI
    return
  }

  for (let tilesRow of tiles) {
    for (let tile of tilesRow) {
      if (!tile.isAlive) break
      if ((boll.y - Boll.radius < tile.y + Tile.height) &&
          ((boll.x - Boll.radius / 2 > tile.x) &&
           (boll.x + Boll.radius / 2 < tile.x + Tile.width)
          )
        ) {
          if (tile.isAlive) {
            tile.isAlive = false
            Boll.speed *= -1
            return
          }
      }
    }
  }
}

const render = (ctx, arkanoid) => {
  const {
    tiles,
    platform,
    boll,
  } = arkanoid

  core(boll, tiles)

  boll.y -= Boll.speed
  boll.x += Boll.speed * Math.cos(boll.angle)

  ctx.clearRect(0, 0, fieldWidth, fieldHeight)
  drawTiles(tiles, ctx)
  platform.draw(ctx)
  boll.draw(ctx)

  var t2 = new Date()
  if (t2 - t < 100000) {
    requestAnimationFrame(() => render(ctx, arkanoid))
  }
}

var t;

window.onload = () => {
  const canvas = document.getElementById('tutorial')
  const ctx = canvas.getContext('2d')

  const arkanoid = {
    tiles: generateTiles(),
    platform: new Platform(),
    boll: new Boll(),
  }

  console.log('arkanoid', arkanoid)

  addEventListener(
    'keydown',
    arkanoid.platform.movePlatformByEvent.bind(arkanoid.platform)
  )

  t = new Date();
  render(ctx, arkanoid)
}
