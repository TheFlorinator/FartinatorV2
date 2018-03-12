/* globals __DEV__ */
import Phaser from 'phaser'
import Sky from '../environment/Sky'
import Fartinator from '../sprites/Fartinator'
import Ground from '../environment/Ground'

export default class extends Phaser.State {
  init () { }
  preload () { }

  create () {
    var jumpTime = 0

    var platforms = this.game.add.group()
    platforms.enableBody = true
    platforms.physicsBodyType = Phaser.Physics.ARCADE
    platforms.createMultiple(5, 'platformJump')
    platforms.setAll('outOfBoundsKill', true)
    platforms.setAll('checkWorldBounds', true)

    this.clouds = new Sky({
      game: this.game,
      x: 0,
      y: 500 - this.game.cache.getImage('florinatorClouds').height,
      width: this.game.width,
      height: this.game.cache.getImage('florinatorClouds').height,
      key: 'florinatorClouds'
    })

    this.sky = new Sky({
      game: this.game,
      x: 0,
      y: this.game.height - this.game.cache.getImage('florinatorSky').height,
      width: this.game.width,
      height: this.game.cache.getImage('florinatorSky').height,
      key: 'florinatorSky'
    })

    this.fartinator = new Fartinator({
      game: this.game,
      x: this.world.centerX - 50,
      y: this.world.centerY - 50,
      asset: 'fartinator',
      jumpTimer: jumpTime,
      platforms: platforms
    })

    this.ground = new Ground({
      game: this.game,
      x: 250,
      y: this.game.world.height - 30,
      asset: 'ground'
    })

    // this.ground.create()
    this.fartinator.create()
    this.ground.create()
    this.game.add.existing(this.sky)
    this.game.add.existing(this.clouds)
    this.game.add.existing(this.fartinator)
    this.game.add.existing(this.ground)
  }

  update () {
    var cursors = this.game.input.keyboard.createCursorKeys()
    this.game.physics.arcade.collide(this.ground, this.fartinator)
    this.game.physics.arcade.collide(this.fartinator, this.platforms)
    this.clouds.tilePosition.x -= 0.3
    if (cursors.right.isDown) {
      this.fartinator.buildPlatform()
    }
  }

  render () {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.fartinator, 32, 32)
    }
  }
}
