import Phaser from 'phaser'
import {randomInt} from '../actions/helpers'

export default class extends Phaser.Group {
  constructor ({ game, parent, name, addToStage, enableBody, physicsBodyType }) {
    super(game, parent, name, addToStage, enableBody, physicsBodyType)
    this.game.add.existing(this)
  }

  createPowerFarts (amount, name) {
    this.createMultiple(amount, name)
    this.setAll('outOfBoundsKill', true)
    this.setAll('checkWorldBounds', true)
  }

  dropPowerObject (badDood) {
    this.fart = this.getFirstExists(false, true)
    if (badDood != null) {
      this.fart.reset(badDood.body.x - 10, badDood.body.y + 10)
      this.fart.body.immovable = true
      this.fart.body.velocity.x = -randomInt(100, 400)
    }
  }
}
