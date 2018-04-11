import Phaser from 'phaser'

export default class extends Phaser.Group {
  constructor ({ game, parent, name, addToStage, enableBody, physicsBodyType }) {
    super(game, parent, name, addToStage, enableBody, physicsBodyType)
  }
  createLives (liveCount) {
    this.game.add.text(50, 30, 'Lives: ', { font: '34px Arial', fill: '#fff' })
    for (var i = 0; i < liveCount; i++) {
      var fartinatorLives = this.create(170 + (30 * i), 50, 'fartinator')
      fartinatorLives.anchor.setTo(0.5, 0.5)
      fartinatorLives.alpha = 0.4
    }
  }
}
