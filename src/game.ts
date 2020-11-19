import 'phaser';
import MenuScene from './menu';
import PlayGame from './playGame';

export default class Demo extends Phaser.Scene
{
    private square: Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
    private playerArray: string[];
    constructor ()
    {
        super('demo');
    }

    preload ()
    {
        this.load.image('logo', 'assets/phaser3-logo.png');
        this.load.image('start', 'assets/start.png');
        this.load.multiatlas("MonkeyBoardGame", "assets/MonkeyBoardGame.json", "assets");
        this.load.multiatlas("EgyptBoardGame", "assets/EgyptBoardGame.json", "assets");
        this.load.multiatlas("DinosaurBoardGame", "assets/DinosaurBoardGame.json", "assets");
        this.load.audio("SpinSound", "assets/SpinSound.mp3");
        this.load.image("spinner", "assets/spinner.png");
        this.load.image("spinnerShaddow", "assets/spinnerShaddow.png");
        this.load.image("arrow", "assets/arrow.png");
        this.load.image("whiteCard", "assets/whiteCard.png");
        this.load.image("Card", "assets/card.png");
        //this.load.json("monkeyJson", "assets/MonkeyBoardGame.json");
        //this.load.image('libs', 'assets/libs.png');
        //this.load.glsl('bundle', 'assets/plasma-bundle.glsl.js');
        //this.load.glsl('stars', 'assets/starfields.glsl.js');
    }

    create ()
    {
        //this.add.shader('RGB Shift Field', 0, 0, 800, 600).setOrigin(0);

        //this.add.shader('Plasma', 0, 412, 800, 172).setOrigin(0);

       // this.add.image(400, 300, 'libs');
       this.square = this.add.rectangle(400, 400, 100, 100, 0xFFFFFF) as any;
        const logo = this.add.image(400, 70, 'logo');
        /*
        this.tweens.add({
            targets: logo,
            y: 350,
            duration: 1500,
            ease: 'Sine.inOut',
            yoyo: true,
            repeat: -1
        })
        */
    }
    update () {
        this.scene.start('menu');
        // this.scene.start('play');
        // this.scene.remove();
      }

}

const config = {
    type: Phaser.AUTO,
    backgroundColor: '#125555',
    width: 800,
    height: 600,
    scene: [Demo, MenuScene, PlayGame],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
    //scene: Demo
};

const game = new Phaser.Game(config);
