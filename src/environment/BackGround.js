import Phaser from 'phaser'

export default class extends Phaser.TileSprite {
  constructor ({ game, x, y, width, height, key }) {
    super(game, x, y, width, height, key)
  }

  create (item) {
    this.game.add.existing(item)
  }
}
