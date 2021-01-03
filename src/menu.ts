import 'phaser';

export default class MenuScene extends Phaser.Scene {

    private monkeyBoard: any;
    private EgyptBoard: any;
    private DinoBoard: any;
    private FishBoard: any;
    //private theFile: string;
    public GamePieces: string[];
    private GamePiecesOnScreen: any[];
    private chosenBoard: string;
    private spriteSheet: string;
    public selectedPieces: string[];
    private spriteGroup: string[];
    private selectedTargets: string[];
    private targetMenu: any;

  constructor () {
    super({ key: 'menu' });
  }

  create () {

    var font = { font: '24px Arial' };

    this.add.text(10, 10, 'Choose Your Game Board', font);

    this.add.text(10, 210, 'Choose a Peice for Each Player', font);

    this.add.text(10, 370, 'Choose One or More Decks', font);

    this.addBoards();

    this.spriteGroup = ['GP1.png', 'GP2.png', 'GP3.png', 'GP4.png', 'GP5.png'];

    this.addBlankCards();

    this.addStart();

    this.GamePieces = new Array();
    this.GamePiecesOnScreen = new Array();
    this.selectedPieces = new Array();
    this.selectedTargets = new Array();

  }

  addStart(){
        //Add Start
        let startButton: any = this.add.image(800, 500, 'start').setInteractive();
        startButton.scaleX  = .40;
        startButton.scaleY = .40;
        startButton.name = "board";
    
        startButton.on('pointerup', function (pointer: any) {
            if(this.selectedPieces.length>0){
                this.scene.start('playGame', { selectedPieces: this.selectedPieces,  spriteSheet: this.spriteSheet });
            }
          }, this);
  }

  calculateAspectRatioFit(srcWidth: number, srcHeight: number, maxWidth: number, maxHeight: number) {

    var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

    return { width: srcWidth*ratio, height: srcHeight*ratio };
 };

 addBlankCards(){

  for(var b = 0;b<3; b++){
    this.addBlankCard(140 + (220 * b), 490, b);
  }
}

  addBlankCard(theX: number, theY:number, name: number){

    const maxSize = 200;

    let cardBack = this.add.sprite(0, 0, 'CardBlankShaddow').setInteractive();
    var theWidth = this.calculateAspectRatioFit(cardBack.width, cardBack.height, maxSize, maxSize).width;
    var theHieght = this.calculateAspectRatioFit(cardBack.width, cardBack.height, maxSize, maxSize).height;
    cardBack.displayWidth = theWidth;
    cardBack.displayHeight = theHieght;
    //cardBack.x = theX;
    //cardBack.y = theY;

    cardBack.on('pointerup', function (pointer: any){
      console.log("board.name ff = ");
      this.showTargetMenu();
    }, this);



    //card.add(cardBack);

    var font = { font: '16px Arial' };

    var theTitle: any = this.add.text((0 - (theWidth/2)) + 20, (0 - (theHieght/2)) + 10, ('Deck ' + name), font);

    this.add.container(theX, theY, [ cardBack, theTitle ]);


  }

  showTargetMenu(){

    const maxSize = 900;


    var background: any = this.add.sprite(0, 0, 'tabBlue').setInteractive();
    var theWidth = this.calculateAspectRatioFit(background.width, background.height, maxSize, maxSize).width;
    var theHieght = this.calculateAspectRatioFit(background.width, background.height, maxSize, maxSize).height;
    background.displayWidth = theWidth;
    background.displayHeight = theHieght;

    var popOver: any = this.add.container((theWidth/2), (theHieght/2));
    popOver.add(background);

    var font = { font: '18px Arial' , fill: "#000000", align: "center"};

    //var theTitle: any = this.add.text(0 - theWidth/2, 0 - theHieght/2, 'Select a Task', font);

    var targetAreas: string[] = ['Articulation', 'Language', 'Directions','Social', 'Fluency'];
    var space: number = 160; 

    for(var i=0; i< targetAreas.length; i++){
      var theTitle: any = this.add.text(-357 + (space * i), -230, targetAreas[i], font);
      theTitle.setInteractive(new Phaser.Geom.Rectangle(0, 0, theTitle.width, theTitle.height), Phaser.Geom.Rectangle.Contains);
      theTitle.name = targetAreas[i];
      theTitle.on('pointerup', function (pointer: any) {
        //console.log("theText = " + theTitle.text);
        this.changeTab(this);
      }, this);
      popOver.add(theTitle);
    }

  }

  changeTab(pointer: any, gameObject: any){
    console.log("theText = " + gameObject.name);
  }

  addBoard(boardName: string, boardNumber: number){

    const maxSize = 140;
    const theSpace = 150;

    let board = this.add.sprite(120 + (theSpace * boardNumber), 120, boardName, 'Board_Small.png').setInteractive();
    var theWidth = this.calculateAspectRatioFit(board.width, board.height, maxSize, maxSize).width;
    var theHieght = this.calculateAspectRatioFit(board.width, board.height, maxSize, maxSize).height;
    board.displayWidth = theWidth;
    board.displayHeight = theHieght;
    board.name = boardName;

    board.on('pointerup', function (pointer: any){
      //this.chosenBoard = gameObject.name;
      this.spriteSheet = board.name;
      //console.log("board.name ff = " + this.spriteSheet);
      this.chosenBoard = board.name;
      this.addPieces();
    }, this);
    //this.monkeyBoard = this.add.sprite(120, 120, 'MonkeyBoardGame', 'Board_Small.png').setInteractive();
    //this.monkeyBoard.scaleX = scaleSize;
    //this.monkeyBoard.scaleY= scaleSize;a
    //this.monkeyBoard.name = "board";
  }

  addBoards(){
    var scaleSize: number = .4;
    var disBetween: number = 190;

    var gameBoardArray: string[] = ['MonkeyBoardGame', 'EgyptBoardGame', 'DinosaurBoardGame', 'FishBoardGame'];

    for(var b = 0;b<gameBoardArray.length; b++){
      this.addBoard(gameBoardArray[b], b);
    }
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

    //console.log("this.selectedPieces = " + this.selectedPieces);

  }

  addPieces(){

    this.clearPieces();

    for(var p = 1;p<6; p++){
      this.piece(p - 1);
    }
  }

  piece(pieceNumber: number){

        var pieceName: string = this.spriteGroup[pieceNumber];

        var piece = this.add.sprite(100 + (pieceNumber * 100), 300, this.spriteSheet, pieceName);
        piece.scaleX = .5;
        piece.scaleY = .5;
        piece.name = pieceName;
        console.log("created = " + piece.name);

        //console.log("piece.width = " + piece.width);
        //console.log("piece.width = " + piece.height);

        piece.setInteractive();

        this.GamePiecesOnScreen.push(piece);

        piece.on('pointerup', function (pointer: any){
          console.log("clicked = " + piece.name);
          console.log("this.selectedPieces = " + this.selectedPieces);
          //console.log("this.selectedPieces.length = " + this.selectedPieces.length);

          var theCount: number = this.selectedPieces.length;

          if(theCount == 0){
            this.selectedPieces.push(piece.name)
            piece.setTint(0xff0000);
          }else{
            var inThere: Boolean = false;
            for(var x=0; x<this.selectedPieces.length; x++){
                if(this.selectedPieces[x] == piece.name){
                    inThere = true;
                };
            };

            if(inThere != true){
              this.selectedPieces.push(piece.name)
              piece.setTint(0xff0000);
            }else{
              const newArray: any = new Array();
              for (var i=0; i<this.selectedPieces.length; i++){
                  if(piece.name != this.selectedPieces[i]){
                      newArray.push(this.selectedPieces[i]);
                  }
              }

              this.selectedPieces = newArray;
              piece.clearTint();
            }




          }
        }, this);
    }

/*
      this.input.on('gameobjectup', function (pointer: any, gameObject: any) {


        if(gameObject.name != "board" && gameObject.name != 'target'){
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
        }else if (gameObject.name == "board"){
          
        }else{
          gameObject.setTint(0xff0000);


          var theCount: number = this.selectedTargets.length;

            if(theCount > 0){

                var inThere: Boolean = false;

                for(var x=0; x<this.selectedTargets.length; x++){
                    //console.log("this.selectedPieces[x] = " + this.selectedPieces[x]);
                    //console.log("gameObject.name = " + gameObject.name);
                    if(this.selectedTargets[x] == gameObject.text){
                        inThere = true;
                    };
                };
                console.log("inThere = " + inThere);

                if(inThere){
                  const newArray: any = new Array();
                  for (var i=0; i<this.selectedTargets.length; i++){
                      //console.log("this.selectedPieces[x] = " + this.selectedPieces[i]);
                      //console.log("gameObject.name = " + gameObject.name);
                      if(gameObject.text != this.selectedTargets[i]){
                          newArray.push(this.selectedTargets[i]);
                      }
                  }

                  this.selectedTargets = newArray;
                  //console.log("newSet = " + newArray);
                  //console.log("this.selectedPieces[i] = " + this.selectedPieces);

                  gameObject.clearTint();
                  
              }else{
                  gameObject.setTint(0xff0000);
                  this.selectedTargets.push(gameObject.text);
              }
              }else{
                this.selectedTargets.push(gameObject.text);
              }



          console.log("selected = " + gameObject.text);
          console.log("this.selectedTargets = " + this.selectedTargets);
        }

  }, this);
*/


}