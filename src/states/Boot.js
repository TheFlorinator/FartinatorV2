import Phaser from 'phaser'

export default class extends Phaser.State {
  preload () {
    this.load.spritesheet('fartinator', 'assets/images/runningStick.png', 40, 50, 7)
    this.load.image('florinatorClouds', 'assets/images/florinatorClouds.png')
    this.load.image('florinatorSky', 'assets/images/florinatorSky.png')
    this.load.image('ground', 'assets/images/ground.png')
    this.load.image('platformJump', 'assets/images/platform.png')
    this.load.image('demon', 'assets/images/demonRobot.png')
    this.load.image('shot', 'assets/images/shots.png')
    this.load.image('bullet', 'assets/images/bullet.png')
    this.load.image('fart', 'assets/images/farts.png')
  }

  create () {
    this.state.start('Game')
    this.game.add.text(this.game.world.width - 200, 10, 'Lives: ', { font: '34px Arial', fill: '#fff' })
    this.stateText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, ' ', { font: '40px Arial', fill: '#fff' })
    this.stateText.visible = false
  }
}
