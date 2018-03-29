import Phaser from 'phaser'
import {randomInt} from '../actions/badDoodStuff'

export default class extends Phaser.Group {
  constructor ({ game, parent, name, enableBody }) {
    super(game, parent, name, enableBody)
  }

  createTheBeast () {
    this.demon = this.create(randomInt(500, 1000), randomInt(50, 100), 'demon')
    this.game.physics.enable(this.demon, Phaser.Physics.ARCADE)
    this.demon.body.bounce.set(1)
    this.demon.body.collideWorldBounds = true
    this.demon.body.velocity.setTo(0, randomInt(50, 200))
  }

  releaseTheBeasts (beastCount) {
    for (var i = 0; i < beastCount; i++) {
      this.createTheBeast()
    }
  }
}
