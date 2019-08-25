import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset, jumpTimer, platforms, cursors, lives }) {
    super(game, x, y, asset, jumpTimer, platforms, lives)
    this.lives = lives
    this.game.physics.arcade.enable(this)
    this.body.setSize(20, 43, 10, 5)
    this.body.gravity.y = 1000
    this.body.collideWorldBounds = true
    this.animations.add('right', [1, 2, 3, 4, 5], 1, true)
    this.animations.add('up', [0], true)
    this.animations.add('down', [6], true)
    this.game.add.existing(this)
    this.cursors = cursors
    this.platforms = platforms
    this.platform = {}
    this.setHealth(100)
  }

  update () {
    if (this.alive) {
      this.animations.play('right', 15, true)
      if (this.body.touching.down && this.body.center.y < 537) {
        this.body.velocity.x = 200
      }
      if (this.cursors.up.isDown && this.body.touching.down) {
        this.animations.play('up', true)
        this.body.velocity.y = -500
      }
      if (this.body.velocity.y < 0) {
        this.animations.play('up', true)
        this.body.velocity.x = 0
      }
      if (this.body.velocity.y > 0) {
        this.animations.play('down', true)
        this.body.velocity.x = 0
      }
      if (this.cursors.right.isDown) {
        this.platforms.buildPlatform(this, this.platforms)
      }
    }
  }

  playerKill (sprite, shot) {
    shot.kill()
    sprite.damage(20)
    if (sprite.health <= 0) {
      this.life = this.lives.getFirstAlive()
      if (this.life) {
        this.life.kill()
        sprite.revive()
      }
      if (this.lives.countLiving() < 1) {
        sprite.kill()
        this.stateText.visible = true
        this.game.input.onTap.addOnce(this.restart, this)
      }
    }
  }

  playerUpgrade (fartinator, fart) {
    fart.kill()
    fartinator.heal(10)
  }

  restart () {
    if (this.badDoods.children.length > 1) {
      for (var i = 0; this.badDoods.children.length - 1 > i; i++) {
        this.badDoods.children.pop()
      }
    }
    this.lives.callAll('revive')
    this.revive()
  }
}
