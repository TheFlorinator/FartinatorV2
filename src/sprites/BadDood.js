import Phaser from 'phaser'
import {randomInt} from '../actions/helpers'

export default class extends Phaser.Group {
  constructor ({ game, parent, name, addToStage, enableBody, physicsBodyType, farts, levels }) {
    super(game, parent, name, addToStage, enableBody, physicsBodyType, farts, levels)
    this.farts = farts
    this.levels = levels
  }

  createTheBeast () {
    this.demon = this.create(randomInt(800, 1000), randomInt(50, 600), 'demon')
    this.game.physics.enable(this.demon, Phaser.Physics.ARCADE)
    this.demon.body.bounce.set(1)
    this.demon.body.collideWorldBounds = true
    this.demon.setHealth(100)
    this.demon.body.velocity.setTo(0, randomInt(50, 200))
    this.callAll('revive')
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
      demon.damage(100)
      if (this.getFirstAlive() === null) {
        this.createTheBeast(1)
      }
    }
    bullet.kill()
  }
}
