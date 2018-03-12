import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)
    //
    // load your assets
    //
    this.load.spritesheet('fartinator', 'assets/images/runningStick.png', 40, 50, 7)
    this.load.image('florinatorClouds', 'assets/images/florinatorClouds.png')
    this.load.image('florinatorSky', 'assets/images/florinatorSky.png')
    this.load.image('ground', 'assets/images/ground.png')
    this.load.image('platformJump', 'assets/images/platform.png')
    this.load.image('demon', 'assets/images/demonRobot.png')
    this.load.image('shot', 'assets/images/shots.png')
    this.load.image('bullet', 'assets/images/bullet.png')
  }

  create () {
    this.state.start('Game')
  }
}
