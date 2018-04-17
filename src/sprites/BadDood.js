import Phaser from 'phaser'
import {randomInt} from '../actions/helpers'

export default class extends Phaser.Group {
  constructor ({ game, parent, name, addToStage, enableBody, physicsBodyType, farts }) {
    super(game, parent, name, addToStage, enableBody, physicsBodyType, farts)
    this.farts = farts
  }

  createTheBeast () {
    this.demon = this.create(randomInt(800, 1000), randomInt(50, 600), 'demon')
    this.game.physics.enable(this.demon, Phaser.Physics.ARCADE)
    this.demon.body.bounce.set(1)
    this.demon.body.collideWorldBounds = true
    this.demon.setHealth(100)
    this.demon.body.velocity.setTo(0, randomInt(50, 200))
  }

  releaseTheBeasts (beastCount) {
    for (var i = 0; i < beastCount; i++) {
      this.createTheBeast()
    }
  }

  badDoodkill (bullet, demon) {
    if (demon.health <= 0) {
      demon.kill()
    } if (demon.health < 90) {
      this.farts.dropPowerObject(demon)
      demon.damage(20)
    } else {
      demon.damage(20)
    }
    bullet.kill()
  }
}
