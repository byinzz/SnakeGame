export default class Snake {
  head: HTMLElement
  bodies: HTMLCollection
  element: HTMLElement

  constructor() {
    this.head = document.querySelector('#snake>div')!
    this.element = document.getElementById('snake')!
    this.bodies = this.element.getElementsByTagName('div')
  }

  get X() {
    return this.head.offsetLeft
  }

  get Y() {
    return this.head.offsetTop
  }

  set X(value: number) {
    if (this.X === value) {
      return
    }
    if (value < 0 || value > 290) {
      throw new Error('蛇撞墙了')
    }

    this.moveBody()
    this.head.style.left = value + 'px'
    this.checkHeadBody()
  }

  set Y(value: number) {
    if (this.Y === value) {
      return
    }
    if (value < 0 || value > 290) {
      throw new Error('蛇撞墙了')
    }
    this.moveBody()
    this.head.style.top = value + 'px'
    this.checkHeadBody()
  }

  addBody() {
    this.element.insertAdjacentHTML('beforeend', '<div></div>')
  }

  moveBody() {
    for (let i = this.bodies.length - 1; i > 0; i--) {
      // 获取前边身体的位置
      let X = (this.bodies[i - 1] as HTMLElement).offsetLeft
      let Y = (this.bodies[i - 1] as HTMLElement).offsetTop

      // 将值设置到当前身体上
      ;(this.bodies[i] as HTMLElement).style.left = X + 'px'
      ;(this.bodies[i] as HTMLElement).style.top = Y + 'px'
    }
  }

  checkHeadBody() {
    if (this.bodies.length >= 5) {
      for (let i = 1; i < this.bodies.length; i++) {
        let bd = this.bodies[i] as HTMLElement
        if (bd.offsetLeft === this.X && bd.offsetTop === this.Y) {
          throw new Error('蛇撞到自己了')
        }
      }
    }
  }
}
