import 'phaser';

export default class PlayGame extends Phaser.Scene {


    private spriteSheet: string;
    private selectedPieces: string[];
    private wheel: any;

    public canSpin: Boolean;

    private WordPairs: string[];

    private cardParts: any;
    private aCard: any;

    private cardCount: number;

    private pieceDepth:number;
    //private dragObj: any;


    init(data){
        this.spriteSheet = data.spriteSheet;
        this.selectedPieces = data.selectedPieces;
      }

    constructor () {
        super({ key: 'playGame' });
      }

    preload ()
    {
        this.load.multiatlas("FCD_Group1", "assets/FCD_Group1.json", "assets");
        this.load.multiatlas("FCD_Group2", "assets/FCD_Group2.json", "assets");
    }

    create ()
    {


        var FCD_group1: string[] =['bar/bark', 'bee/beep', 'buy/bite', 'boo/boot', 'bow/boat', 'day/date', 'key/keep', 'pie/pine', 'see/seed', 'pie/pipe', 'tea/team', 'tie/time', 'toe/toad', 'toe/toast', 'two/toot'];
        var FCD_group1: string[] =['fee/feed', 'low/load', 'may/make', 'me/meat', 'my/mine', 'moo/mood', 'no/nose', 'pea/peep', 'she/sheep', 'we/weak', 'new/noon'];


        this.WordPairs = FCD_group1;

        console.log("this.selectedPieces = " + this.selectedPieces);

        const board = this.add.sprite(450, 300, this.spriteSheet, 'Board.png');
		board.scaleX = .5;
        board.scaleY = .5;
        console.log("board.width = " + board.width);
        
        
        const wheelShadow: any = this.add.sprite(85, 85, "spinnerShaddow");
        wheelShadow.scaleX = .5;
		wheelShadow.scaleY = .5;

        this.wheel = this.add.sprite(85, 85, "spinner").setInteractive();
		//var spinner = this.add.sprite(100, 100, 'spinner').setInteractive();
		this.wheel.scaleX = .5;
		this.wheel.scaleY = .5;

		this.canSpin = true;

        this.wheel.on("pointerdown", this.spinWheel, this);

        const arrow = this.add.sprite(85, 15, "arrow");
        arrow.scaleX = .25;
        arrow.scaleY = .25;

        this.cardParts = [];
        this.cardCount = 0;

        
        const deck = this.add.sprite(280, 62, this.spriteSheet, 'CardTop1.png').setInteractive();
        deck.scaleX = .5;
        deck.scaleY = .5;
        deck.on("pointerdown", this.showCard, this);
        deck.x = 380;
        //this.showCard(this.WordPairs[5]);

        for(var i=0; i < this.selectedPieces.length; i++){

            var piece = this.add.image(40, 400 - (i * 90), this.spriteSheet, this.selectedPieces[i]);
            piece.scaleX = .5;
            piece.scaleY = .5;
            piece.name = this.selectedPieces[i];

            piece.depth = i;
    
            piece.setInteractive();
            this.input.setDraggable(piece);
        }
        //this.input.on('pointerdown', this.startDrag,this);

        this.input.on('dragstart', function (pointer, gameObject) {

            this.pieceDepth = gameObject.depth;
            console.log("this.pieceDepth = " + this.pieceDepth);

            gameObject.depth = 100;
    
        });

        this.input.on('dragend', function (pointer: any, gameObject: any) {

            //console.log("this.pieceDepth = " + this.pieceDepth);
            gameObject.depth = this.pieceDepth;
            //this.pieceDepth = gameObject.depth;
            console.log("this.pieceDepth = " + this.pieceDepth);
    
        });

        this.input.on('drag', function (pointer: any, gameObject: any, dragX: number, dragY: number) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });


    }


    showCard(){

        if(this.cardParts.length == 0){
            this.canSpin = false;
            var thePair: string = this.WordPairs[this.cardCount];
            this.cardCount++;

            var aPair: string[] = thePair.split('/');

            console.log("aPair= " + aPair);


            const cardBack: any = this.add.sprite(450, 330, 'whiteCard').setInteractive();
            cardBack.x = 225;
            cardBack.y = 150;
            cardBack.angle = 90;
            cardBack.scaleX = 1.3;
            cardBack.scaleY = 1.4;

            cardBack.on("pointerdown", this.closeCard, this);
        //cardBack.scaleX = theScale;
        //cardBack.scaleY = theScale; 

            var Word1 = aPair[0];
            var Word2 = aPair[1];

            var pic1name = Word1.concat(".jpg");
            var pic2name = Word2.concat(".jpg");


            var theScale: number = .4;


            const pic1: any = this.add.sprite(125, 130, 'FCD_Group2', pic1name);
            pic1.scaleX = theScale;
            pic1.scaleY = theScale;


            const pic2: any = this.add.sprite(325, 130, 'FCD_Group2', pic2name);
            pic2.scaleX = theScale;
            pic2.scaleY = theScale;

            var style = { font: "40px Arial", fill: "#000000", align: "center" };

            const text1 = this.add.text(75, 235, Word1, style);
            const text2 = this.add.text(290, 235, Word2, style);

            this.aCard = this.add.container(250, 175, [cardBack, pic1, pic2, text1, text2]);

            this.cardParts = [cardBack, pic1, pic2, text1, text2];
            this.aCard.depth = 200;

        }


    }

    closeCard(){
        console.log('close');
        for(var i=0; i<this.cardParts.length; i++){
            this.cardParts[i].destroy();
        }
        this.cardParts = [];
        this.canSpin = true;
    }

    spinWheel(){
 
        // can we spin the wheel?
        if(this.canSpin){
			var SpinSound = this.sound.add('SpinSound');
    		SpinSound.play();
            // resetting text field
            //this.prizeText.setText("");
 
            // the wheel will spin round from 2 to 4 times. This is just coreography
            var rounds = Phaser.Math.Between(2, 4);
 
            // then will rotate by a random number from 0 to 360 degrees. This is the actual spin
            var degrees = Phaser.Math.Between(0, 360);
 
            // before the wheel ends spinning, we already know the prize according to "degrees" rotation and the number of slices
            //var prize = gameOptions.slices - 1 - Math.floor(degrees / (360 / gameOptions.slices));
 
            // now the wheel cannot spin because it's already spinning
            this.canSpin = false;
 
            // animation tweeen for the spin: duration 3s, will rotate by (360 * rounds + degrees) degrees
            // the quadratic easing will simulate friction
            this.tweens.add({
 
                // adding the wheel to tween targets
                targets: [this.wheel],
 
                // angle destination
                angle: 360 * rounds + degrees,
 
                // tween duration
               // duration: gameOptions.rotationTime,
			   duration: 3000,
 
                // tween easing
                ease: "Cubic.easeOut",
 
                // callback scope
                callbackScope: this,
 
                // function to be executed once the tween has been completed
                onComplete: function(tween){
 
                    // displaying prize text
                    //this.prizeText.setText(gameOptions.slicePrizes[prize]);
 
                    // player can spin again
                    this.canSpin = true;
                }
            });
        }



}
}