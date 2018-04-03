import Phaser from 'phaser'
import {randomInt} from '../actions/helpers'

export default class extends Phaser.Group {
  constructor ({ game, parent, enableBody, physicsBodyType, cursors, sprites, shootTimer }) {
    super(game, parent, enableBody, physicsBodyType, cursors, sprites, shootTimer)
    this.cursors = cursors
    this.shootTimer = shootTimer
    this.sprites = sprites
    this.setAll('anchor.x', 0.5)
    this.setAll('anchor.y', 1)
    // this.createMultiple(20, 'shot')
    this.setAll('outOfBoundsKill', true)
    this.setAll('checkWorldBounds', true)
    this.shootTimer = []
    this.game.add.existing(this)
  }

  createBadDoodShots () {
    this.createMultiple(20, 'shot')
  }

  createGoodDoodShots () {
    this.createMultiple(20, 'bullet')
  }

  badDoodShoots (shots) {
    for (var i = 0; i < this.sprites.children.length; i++) {
      var badDood = this.sprites.children[i]
      // make shootTimer more efficient
      this.shootTimer.push(0)
      if (this.game.time.now > this.shootTimer[i]) {
        this.shot = shots.getFirstExists(false, true)
        this.game.physics.enable(this.shot, Phaser.Physics.ARCADE)
        if (badDood != null && badDood.alive) {
          this.shot.reset(badDood.body.x, badDood.body.y)
          this.shot.body.immovable = true
          this.shot.body.velocity.x = -randomInt(100, 400)
          this.shootTimer[i] = this.game.time.now + randomInt(800, 1300)
        }
      }
    }
  }

  goodDoodShoots (shots) {
    this.shootTimer.push(0)
    if (this.game.time.now > this.shootTimer[0]) {
      this.shot = shots.getFirstExists(false, true)
      this.game.physics.enable(this.shot, Phaser.Physics.ARCADE)
      if (this.shot) {
        this.shot.reset(this.sprites.x + 20, this.sprites.y + 20)
        this.shot.body.velocity.x = 400
        this.shootTimer[0] = this.game.time.now + 300
      }
    }
  }
}
