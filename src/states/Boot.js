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
  }

  // render () {
  //   if (config.webfonts.length && this.fontsReady) {
  //     this.state.start('Splash')
  //   }
  //   if (!config.webfonts.length) {
  //     this.state.start('Splash')
  //   }
  // }
  create () {
    this.state.start('Game')
  }

  fontsLoaded () {
    this.fontsReady = true
  }
}
