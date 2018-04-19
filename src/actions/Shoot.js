import Phaser from 'phaser'
import {randomInt} from '../actions/helpers'

export default class extends Phaser.Group {
  constructor ({ game, parent, name, addToStage, enableBody, physicsBodyType, sprites }) {
    super(game, parent, name, addToStage, enableBody, physicsBodyType, sprites)
    this.sprites = sprites
    this.shootTimer = []
    this.game.add.existing(this)
    this.setupShootTimer()
  }

  createShots (amount, name) {
    this.createMultiple(amount, name)
    this.setAll('outOfBoundsKill', true)
    this.setAll('checkWorldBounds', true)
  }

  badDoodShoots (shots) {
    if (this.shootTimer.length < this.sprites.children.length) {
      this.setupShootTimer()
    }
    for (var i = 0; i <= this.sprites.children.length; i++) {
      var badDood = this.sprites.children[i]
      if (this.game.time.now > this.shootTimer[i]) {
        this.shot = shots.getFirstExists(false, true)
        if (badDood != null && badDood.alive) {
          this.shot.reset(badDood.body.x - 10, badDood.body.y + 10)
          this.shot.body.immovable = true
          this.shot.body.velocity.x = -randomInt(100, 400)
          this.shootTimer[i] = this.game.time.now + randomInt(800, 1300)
        }
      }
    }
  }

  goodDoodShoots (shots) {
    if (this.game.time.now > this.shootTimer[0]) {
      this.shot = shots.getFirstExists(false, true)
      if (this.shot) {
        this.shot.reset(this.sprites.x + 20, this.sprites.y - 10)
        this.shot.body.immovable = true
        this.shot.body.velocity.x = 400
        this.shootTimer[0] = this.game.time.now + 300
      }
    }
  }

  setupShootTimer () {
    for (var i = 0; i <= this.sprites.children.length; i++) {
      this.shootTimer.push(0)
    }
  }
}
