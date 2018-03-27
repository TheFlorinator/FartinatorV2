import Phaser from 'phaser'

export default class extends Phaser.Group {
  constructor ({ game, parent, name, enableBody }) {
    super(game, parent, name, enableBody)
    this.demon = this.create(1000, 100, 'demon')
    this.game.physics.enable(this.demon, Phaser.Physics.ARCADE)
    this.demon.body.bounce.set(1)
    this.demon.body.collideWorldBounds = true
    this.demon.body.velocity.setTo(0, 100)
  }
}
