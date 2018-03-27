import Phaser from 'phaser'

export default class extends Phaser.Group {
  constructor ({ game, parent, enableBody, physicsBodyType, cursors, badDoods, shootTimer }) {
    super(game, parent, enableBody, physicsBodyType, cursors, badDoods, shootTimer)
    this.cursors = cursors
    // shootTimer not tied correctly to badDoods
    this.shootTimer = shootTimer
    this.badDoods = badDoods
  }

  createShots () {
    this.setAll('anchor.x', 0.5)
    this.setAll('anchor.y', 1)
    this.createMultiple(20, 'shot')
    this.setAll('outOfBoundsKill', true)
    this.setAll('checkWorldBounds', true)
    this.shootTimer.push(0)
  }

  fireLargeShots (shots) {
    for (var i = 0; i < this.badDoods.children.length; i++) {
      var badDood = this.badDoods.children[i]
      if (this.game.time.now > this.shootTimer[i]) {
        this.shot = shots.getFirstExists(false, true)
        this.game.physics.enable(this.shot, Phaser.Physics.ARCADE)
        if (badDood != null && badDood.alive) {
          this.shot.reset(badDood.body.x, badDood.body.y)
          this.shot.body.immovable = true
          this.shot.body.velocity.x = -200
          this.shootTimer[i] = this.game.time.now + 800
        }
      }
    };
  }
}
