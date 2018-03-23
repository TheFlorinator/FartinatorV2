import Phaser from 'phaser'

export default class extends Phaser.Group {
  constructor ({ game, parent, enableBody, physicsBodyType, jumpTimer }) {
    super(game, parent, enableBody, physicsBodyType, jumpTimer)
    this.jumpTimer = jumpTimer
  }

  buildPlatform (sprite, platforms, game) {
    if (game.time.now > this.jumpTimer.time) {
      var platform = platforms.getFirstExists(false, true)
      game.physics.enable(platform, Phaser.Physics.ARCADE)
      if (platform) {
        platform.reset(sprite.body.center.x + 5, sprite.body.center.y + 30)
        platform.body.immovable = true
        platform.body.velocity.x = -200
        sprite.body.velocity.y = 0
      }
      this.jumpTimer.time = this.game.time.now + 400
      return platform
    }
  }
}
