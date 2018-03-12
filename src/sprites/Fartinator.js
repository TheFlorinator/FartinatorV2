import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset, jumpTimer, platforms }) {
    super(game, x, y, asset, jumpTimer, platforms)
    this.anchor.setTo(0.5)
  }

  create () {
    this.game.physics.arcade.enable(this)
    this.body.setSize(20, 43, 10, 5)
    this.body.gravity.y = 1000
    this.body.collideWorldBounds = true
    this.animations.add('right', [1, 2, 3, 4, 5], 1, true)
    this.animations.add('up', [0], true)
    this.animations.add('down', [6], true)
  }

  update () {
    this.animations.play('right', 15, true)

    var cursors = this.game.input.keyboard.createCursorKeys()

    if (cursors.up.isDown && this.body.touching.down) {
      this.animations.play('up', true)
      this.body.velocity.y = -500
    }
    if (this.body.velocity.y < 0) {
      this.animations.play('up', true)
    }
    if (this.body.velocity.y > 0) {
      this.animations.play('down', true)
    }
  }

  // buildPlatform () {
  //   //if (this.game.time.now > this.jumpTimer) {
  //     var platform = this.platforms.getFirstExists(false)
  //     if (platform) {
  //       platform.reset(this.body.center.x + 5, this.body.center.y + 30)
  //       platform.body.immovable = true
  //       platform.body.velocity.x = -200
  //       this.body.velocity.y = 0
  //       this.jumpTimer = this.game.time.now + 400
  //     }
  //  }
}
