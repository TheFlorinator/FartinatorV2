/* globals __DEV__ */
import Phaser from 'phaser'
import BackGround from '../environment/BackGround'
import Fartinator from '../sprites/Fartinator'
import Ground from '../environment/Ground'
import Platforms from '../environment/Platforms'

export default class extends Phaser.State {
  init () { }
  preload () { }

  create () {
    this.cursors = this.game.input.keyboard.createCursorKeys()
    this.jumpTimer = {
      time: 0
    }

    this.sky = new BackGround({
      game: this.game,
      x: 0,
      y: this.game.height - this.game.cache.getImage('florinatorSky').height,
      width: this.game.width,
      height: this.game.cache.getImage('florinatorSky').height,
      key: 'florinatorSky'
    })

    this.sky.create(this.sky)

    this.clouds = new BackGround({
      game: this.game,
      x: 0,
      y: 500 - this.game.cache.getImage('florinatorClouds').height,
      width: this.game.width,
      height: this.game.cache.getImage('florinatorClouds').height,
      key: 'florinatorClouds'
    })

    this.clouds.create(this.clouds)

    this.platforms = new Platforms({
      game: this.game,
      parent: null,
      enableBody: true,
      physicsBodyType: Phaser.Physics.ARCADE,
      jumpTimer: this.jumpTimer
    })

    this.platforms.createMultiple(5, 'platformJump')
    this.platforms.setAll('outOfBoundsKill', true)
    this.platforms.setAll('checkWorldBounds', true)

    this.ground = new Ground({
      game: this.game,
      x: 250,
      y: this.game.world.height - 30,
      asset: 'ground'
    })
    this.ground.create()

    this.fartinator = new Fartinator({
      game: this.game,
      x: this.world.centerX - 50,
      y: this.world.centerY - 50,
      asset: 'fartinator',
      cursors: this.cursors,
      platforms: this.platforms
    })

    this.game.add.existing(this.platforms)
    this.game.add.existing(this.fartinator)
    this.game.add.existing(this.ground)
  }

  update () {
    this.game.physics.arcade.collide(this.ground, this.fartinator)
    this.game.physics.arcade.collide(this.fartinator, this.platforms)
    this.clouds.tilePosition.x -= 0.3
    // var cursors = this.game.input.keyboard.createCursorKeys()

    this.fartinator.update()
  }

  render () {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.fartinator, 32, 32)
    }
  }
}
