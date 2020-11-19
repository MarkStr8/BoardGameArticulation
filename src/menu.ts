import 'phaser';

export default class MenuScene extends Phaser.Scene {

    private monkeyBoard: any;
    private EgyptBoard: any;
    private DinoBoard: any;
    //private theFile: string;
    private GamePieces: string[];
    private GamePiecesOnScreen: any[];
    private chosenBoard: string;
    private spriteSheet: any;
    public selectedPieces: string[];
    private spriteGroup: string[];

  constructor () {
    super({ key: 'menu' });
  }

  create () {

    var font = { font: '24px Arial' };

    this.add.text(10, 10, 'Choose Your Game Board', font);

    this.add.text(10, 210, 'Choose Your Pieces', font);

    this.add.text(10, 370, 'Choose Your Targets', font);


    //Add Boards
    this.monkeyBoard = this.add.sprite(120, 120, 'MonkeyBoardGame', 'Board_Small.png').setInteractive();
    this.monkeyBoard.scaleX = .5;
    this.monkeyBoard.scaleY= .5;
    this.monkeyBoard.name = "board";

    this.EgyptBoard = this.add.sprite(340, 120, 'EgyptBoardGame', 'Board_Small.png').setInteractive();
    this.EgyptBoard .scaleX = .5;
    this.EgyptBoard .scaleY= .5;
    this.EgyptBoard.name = "board";

    this.DinoBoard = this.add.sprite(560, 120, 'DinosaurBoardGame', 'Board_Small.png').setInteractive();
    this.DinoBoard .scaleX = .5;
    this.DinoBoard .scaleY= .5;
    this.DinoBoard.name = "board";

    //Add Board Functions
    this.monkeyBoard.on('pointerup', function (pointer: any) {
      this.chosenBoard = "monkey";
      this.showPices();
    }, this);

    this.EgyptBoard.on('pointerup', function (pointer: any) {
      this.chosenBoard = "Egypt";
      this.showPices();
    }, this);

    this.DinoBoard.on('pointerup', function (pointer: any) {
      this.chosenBoard = "Dinosaur";
      this.showPices();
    }, this);

    //Add Start
    let startButton: any = this.add.image(400, 560, 'start').setInteractive();
    startButton.scaleX  = .50;
    startButton.scaleY = .50;
    startButton.name = "board";

    startButton.on('pointerup', function (pointer: any) {
        if(this.selectedPieces.length>0){
            this.scene.start('playGame', { selectedPieces: this.selectedPieces,  spriteSheet: this.spriteSheet });
        }
      }, this);



    this.spriteGroup = ['GP1.png', 'GP2.png', 'GP3.png', 'GP4.png', 'GP5.png'];

    this.GamePieces = new Array();
    this.GamePiecesOnScreen = new Array();
    this.selectedPieces = new Array();

    


  }



  clearPieces(){
    if(this.GamePiecesOnScreen.length > 0){
      for(var i=0; i< this.GamePiecesOnScreen.length; i++){
        //this.input.disable(this.GamePiecesOnScreen[i]);
        var aSprite = this.GamePiecesOnScreen[i];
        this.input.removeAllListeners();
        this.GamePiecesOnScreen[i].destroy();
      }
    }
    this.GamePieces = [];
    this.selectedPieces = [];
    this.GamePiecesOnScreen = [];

    console.log("this.selectedPieces = " + this.selectedPieces);

  }

    showPices(){

      this.clearPieces();
      console.log("this.GamePieces = " + this.GamePieces);
      console.log("this.selectedPieces = " + this.selectedPieces);
      console.log("this.GamePiecesOnScreen = " + this.GamePiecesOnScreen);



      switch(this.chosenBoard) {
        case 'monkey':
          this.spriteSheet = 'MonkeyBoardGame';
          break;
        case 'Egypt':
        this.spriteSheet = 'EgyptBoardGame';
        break;
        case 'Dinosaur':
          this.spriteSheet = 'DinosaurBoardGame';
          break;
      default:
        // code block
      }

      for (var i = 0; i < 5; i++) {

        var pieceName: string = this.spriteGroup[i];

        var piece = this.add.sprite(100 + (i * 100), 300, this.spriteSheet, pieceName);
        piece.scaleX = .5;
        piece.scaleY = .5;
        piece.name = pieceName;

        piece.setInteractive();

        this.GamePiecesOnScreen.push(piece);
      }


      this.input.on('gameobjectup', function (pointer: any, gameObject: any) {

        if(gameObject.name != "board"){
            console.log("clicked = " + gameObject.name);
            console.log("this.selectedPieces = " + this.selectedPieces);
            console.log("this.selectedPieces.length = " + this.selectedPieces.length);

            var theCount: number = this.selectedPieces.length;

            if(theCount > 0){

                var inThere: Boolean = false;

                for(var x=0; x<this.selectedPieces.length; x++){
                    //console.log("this.selectedPieces[x] = " + this.selectedPieces[x]);
                    //console.log("gameObject.name = " + gameObject.name);
                    if(this.selectedPieces[x] == gameObject.name){
                        inThere = true;
                    };
                };

                console.log("inThere = " + inThere);

                //var tempArray: string[];


                if(inThere){
                    //this.selectedPieces.pop(gameObject.name);
                    const newArray: any = new Array();
                    for (var i=0; i<this.selectedPieces.length; i++){
                        //console.log("this.selectedPieces[x] = " + this.selectedPieces[i]);
                        //console.log("gameObject.name = " + gameObject.name);
                        if(gameObject.name != this.selectedPieces[i]){
                            newArray.push(this.selectedPieces[i]);
                        }
                    }

                    this.selectedPieces = newArray;
                    //console.log("newSet = " + newArray);
                    //console.log("this.selectedPieces[i] = " + this.selectedPieces);



                    gameObject.clearTint();
                    
                }else{
                    gameObject.setTint(0xff0000);
                    this.selectedPieces.push(gameObject.name);
                }
            }else{
                gameObject.setTint(0xff0000);
                this.selectedPieces.push(gameObject.name);
            }
        }

  }, this);
      

    }
}