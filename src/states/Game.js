import Phaser from 'phaser'
import BackGround from '../environment/BackGround'
import Fartinator from '../sprites/Fartinator'
import Ground from '../environment/Ground'
import Platforms from '../environment/Platforms'
import BadDood from '../sprites/BadDood'
import Shoot from '../actions/Shoot'
import Lives from '../actions/Lives'
import PowerObjects from '../actions/PowerObjects'

export default class extends Phaser.State {
  init () { }
  preload () { }

  create () {
    this.cursors = this.game.input.keyboard.createCursorKeys()
    this.fireButoon = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    this.jumpTimer = { time: 0 }
    this.stateText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, ' ', { font: '40px Arial', fill: '#000000' })
    this.stateText.visible = false

    this.sky = new BackGround({
      game: this.game,
      x: 0,
      y: this.game.height - this.game.cache.getImage('florinatorSky').height,
      width: this.game.width,
      height: this.game.cache.getImage('florinatorSky').height,
      key: 'florinatorSky'
    })

    this.lives = new Lives({
      game: this.game,
      parent: this.game.world,
      name: 'lives',
      addToStage: false,
      enableBody: false,
      physicsBodyType: Phaser.Physics.ARCADE
    })
    this.lives.createLives(3)

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
      parent: this.game.world,
      name: 'platforms',
      addToStage: false,
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

    this.powerFarts = new PowerObjects({
      game: this.game,
      parent: this.game.world,
      name: 'powerFarts',
      addToStage: false,
      enableBody: true,
      physicsBodyType: Phaser.Physics.ARCADE
    })
    this.powerFarts.createPowerFarts(20, 'fart')

    this.badDoods = new BadDood({
      game: this.game,
      parent: this.game.world,
      name: 'badDoods',
      addToStage: false,
      enableBody: true,
      physicsBodyType: Phaser.Physics.ARCADE,
      farts: this.powerFarts,
      levels: this.levels
    })
    this.badDoods.releaseTheBeasts(1)

    this.badDoodShots = new Shoot({
      game: this.game,
      parent: this.game.world,
      name: 'badShots',
      addToStage: false,
      enableBody: true,
      physicsBodyType: Phaser.Physics.ARCADE,
      sprites: this.badDoods
    })
    this.badDoodShots.createShots(20, 'shot')

    this.fartinator = new Fartinator({
      game: this.game,
      x: this.world.centerX - 50,
      y: this.world.centerY - 50,
      asset: 'fartinator',
      cursors: this.cursors,
      platforms: this.platforms,
      lives: this.lives,
      text: this.stateText,
      badDoods: this.badDoods
    })

    this.fartinatorShots = new Shoot({
      game: this.game,
      parent: this.game.world,
      name: 'goodShots',
      addToStage: false,
      enableBody: true,
      physicsBodyType: Phaser.Physics.ARCADE,
      sprites: this.fartinator
    })
    this.fartinatorShots.createShots(20, 'bullet')
  }

  update () {
    this.game.physics.arcade.collide(this.ground, this.fartinator)
    this.game.physics.arcade.collide(this.fartinator, this.platforms)
    this.game.physics.arcade.overlap(this.badDoodShots, this.fartinator, this.fartinator.playerKill, null, this.fartinator)
    this.game.physics.arcade.overlap(this.fartinatorShots, this.badDoods, this.badDoods.badDoodkill, null, this.badDoods)
    this.game.physics.arcade.overlap(this.powerFarts, this.fartinator, this.fartinator.playerUpgrade, null, this.fartinator)
    this.clouds.tilePosition.x -= 0.3
    this.badDoodShots.badDoodShoots(this.badDoodShots)
    if (this.fartinator.alive) {
      if (this.fireButoon.isDown) {
        this.fartinatorShots.goodDoodShoots(this.fartinatorShots)
      }
    }
  }

  render () {
    // this.game.debug.physicsGroup(this.badDoodShots)
    // this.game.debug.body(this.fartinator)
    // if (__DEV__) {
    //   this.game.debug.spriteInfo(this.fartinator, 32, 32)
    // }
  }
}
