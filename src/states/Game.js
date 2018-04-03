/* globals __DEV__ */
import Phaser from 'phaser'
import BackGround from '../environment/BackGround'
import Fartinator from '../sprites/Fartinator'
import Ground from '../environment/Ground'
import Platforms from '../environment/Platforms'
import BadDood from '../sprites/BadDood'
import Shoot from '../actions/Shoot'

export default class extends Phaser.State {
  init () { }
  preload () { }

  create () {
    this.cursors = this.game.input.keyboard.createCursorKeys()
    this.fireButoon = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    this.jumpTimer = { time: 0 }

    this.sky = new BackGround({
      game: this.game,
      x: 0,
      y: this.game.height - this.game.cache.getImage('florinatorSky').height,
      width: this.game.width,
      height: this.game.cache.getImage('florinatorSky').height,
      key: 'florinatorSky'
    })

    this.clouds = new BackGround({
      game: this.game,
      x: 0,
      y: 500 - this.game.cache.getImage('florinatorClouds').height,
      width: this.game.width,
      height: this.game.cache.getImage('florinatorClouds').height,
      key: 'florinatorClouds'
    })

    this.platforms = new Platforms({
      game: this.game,
      parent: null,
      enableBody: true,
      physicsBodyType: Phaser.Physics.ARCADE,
      jumpTimer: this.jumpTimer,
      cursors: this.cursors
    })

    this.ground = new Ground({
      game: this.game,
      x: 250,
      y: this.game.world.height - 30,
      asset: 'ground'
    })

    this.fartinator = new Fartinator({
      game: this.game,
      x: this.world.centerX - 50,
      y: this.world.centerY - 50,
      asset: 'fartinator',
      cursors: this.cursors,
      platforms: this.platforms
    })

    this.badDoods = new BadDood({
      game: this.game,
      parent: null,
      name: 'badDoods',
      enableBody: true
    })
    this.badDoods.releaseTheBeasts(3)

    this.badDoodShots = new Shoot({
      game: this.game,
      parent: null,
      enableBody: true,
      physics: Phaser.Physics.ARCADE,
      sprites: this.badDoods,
      shootTimer: []
    })
    this.badDoodShots.createBadDoodShots()

    this.fartinatorShots = new Shoot({
      game: this.game,
      parent: null,
      enableBody: true,
      physicsBodyType: Phaser.Physics.ARCADE,
      sprites: this.fartinator,
      shootTimer: []
    })
    this.fartinatorShots.createGoodDoodShots()
  }

  update () {
    this.game.physics.arcade.collide(this.ground, this.fartinator)
    this.game.physics.arcade.collide(this.fartinator, this.platforms)
    this.game.physics.arcade.overlap(this.badDoodShots, this.fartinator, this.fartinator.playerKill, null, this.fartinator)
    this.game.physics.arcade.overlap(this.fartinatorShots, this.badDoods, this.badDoods.badDoodkill, null, this.badDoods)
    this.clouds.tilePosition.x -= 0.3
    this.badDoodShots.badDoodShoots(this.badDoodShots)
    if (this.fireButoon.isDown) {
      this.fartinatorShots.goodDoodShoots(this.fartinatorShots)
    }
  }

  render () {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.fartinator, 32, 32)
    }
  }
}
