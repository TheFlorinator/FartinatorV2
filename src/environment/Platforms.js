import Phaser from 'phaser'

export default class extends Phaser.Group {
  constructor ({ game, parent, name, addToStage, enableBody, physicsBodyType, jumpTimer, cursors }) {
    super(game, parent, name, addToStage, enableBody, physicsBodyType, jumpTimer, cursors)
    this.jumpTimer = jumpTimer
    this.cursors = cursors
    this.createMultiple(7, 'platformJump')
    this.setAll('outOfBoundsKill', true)
    this.setAll('checkWorldBounds', true)
    this.game.add.existing(this)
  }

  update () {
    if (this.cursors.down.isDown) {
      this.platform.kill()
    }
  }

  buildPlatform (sprite, platforms) {
    if (this.game.time.now > this.jumpTimer.time) {
      this.platform = platforms.getFirstExists(false, true)
      this.game.physics.enable(this.platform, Phaser.Physics.ARCADE)
      if (this.platform) {
        this.platform.reset(sprite.body.center.x + 5, sprite.body.center.y + 30)
        this.platform.body.immovable = true
        this.platform.body.velocity.x = -200
        sprite.body.velocity.y = 0
      }
      this.jumpTimer.time = this.game.time.now + 400
    }
  }
}
