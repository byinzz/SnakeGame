import Snake from './Snake'
import Food from './Food'
import ScorePanel from './ScorePanel'

export default class GameControl {
  snake: Snake
  food: Food
  scorePanel: ScorePanel

  direction = 'Right'

  isLive = true

  constructor() {
    this.snake = new Snake()
    this.food = new Food()
    this.scorePanel = new ScorePanel(10, 5)
    this.init()
  }
  init() {
    document.addEventListener('keydown', this.keydownHandler.bind(this))
    this.run()
  }

  keydownHandler(event: KeyboardEvent) {
    if (
      !(
        this.direction === event.key ||
        (event.key === ('ArrowUp' || 'Up') && this.direction === ('ArrowDown' || 'Down')) ||
        (event.key === ('ArrowDown' || 'Down') && this.direction === ('ArrowUp' || 'Up')) ||
        (event.key === ('ArrowLeft' || 'Left') && this.direction === ('ArrowRight' || 'Right')) ||
        (event.key === ('ArrowRight' || 'Right') && this.direction === ('ArrowLeft' || 'Left'))
      )
    ) {
      setTimeout(() => {
        this.direction = event.key
      }, 100)
    }
  }

  run() {
    let x = this.snake.X
    let y = this.snake.Y
    switch (this.direction) {
      case 'ArrowUp':
      case 'Up':
        y -= 10
        break
      case 'ArrowDown':
      case 'Down':
        y += 10
        break
      case 'ArrowLeft':
      case 'Left':
        x -= 10
        break
      case 'ArrowRight':
      case 'Right':
        x += 10
        break
    }

    this.checkEat(x, y)

    try {
      this.snake.X = x
      this.snake.Y = y
    } catch (e: any) {
      alert(e.message + ',Game Over!')
      this.isLive = false
    }

    this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30)
  }

  checkEat(X: number, Y: number) {
    if (X === this.food.X && Y === this.food.Y) {
      this.food.change()
      this.snake.addBody()
      this.scorePanel.addScore()
    }
  }
}
