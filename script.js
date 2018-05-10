const canvas = document.getElementById('canvas');
const context = canvas.getContext("2d");
const gridWidth = 20;
const gridHeight = 20;
const colCount = 19;
const rowCount = 22;
const direction = {left: 0, right: 1, top: 2, down: 3};
const canvasWidth = gridWidth * colCount;
const canvasHeight = gridHeight * rowCount;
canvas.width = canvasWidth;
canvas.height = canvasHeight;
context.fillStyle = 'blue';
context.fillRect(0, 0, canvasWidth, canvasHeight);

var cells = [];
var bird = new Bird(9, 10);
var fruit = new Fruit(9, 12);
console.log(bird);
console.log(fruit);

initialize();
setFill();

setInterval(function(){
  update();
  draw();
}, 10);

function update(){
  var 
}

function initialize(){
  for(var i = 0; i < colCount; i++){
    var col = [];
    for(var j = 0; j < rowCount; j++){
      col.push(new Cell(i, j));
    }
    cells.push(col);
  }
}
function setFill(){
  cells[1][7].fill = true;  cells[1][9].fill = true;
  cells[1][11].fill = true; cells[1][13].fill = true;
  cells[1][17].fill = true;

  cells[2][2].fill = true;  cells[2][3].fill = true;
  cells[2][5].fill = true;  cells[2][7].fill = true;
  cells[2][9].fill = true;  cells[2][11].fill = true;
  cells[2][13].fill = true; cells[2][15].fill = true;
  cells[2][19].fill = true;

  cells[3][2].fill = true;  cells[3][3].fill = true;
  cells[3][5].fill = true;  cells[3][7].fill = true;
  cells[3][8].fill = true;  cells[3][9].fill = true;
  cells[3][11].fill = true; cells[3][12].fill = true;
  cells[3][13].fill = true;
  cells[3][15].fill = true; cells[3][16].fill = true;
  cells[3][17].fill = true; cells[3][19].fill = true;

  cells[4][19].fill = true;

  cells[5][2].fill = true;  cells[5][3].fill = true;
  cells[5][5].fill = true;  cells[5][6].fill = true;
  cells[5][7].fill = true;  cells[5][8].fill = true;
  cells[5][9].fill = true;  cells[5][11].fill = true;
  cells[5][12].fill = true; cells[5][13].fill = true;
  cells[5][15].fill = true; cells[5][17].fill = true;
  cells[5][18].fill = true; cells[5][19].fill = true;

  cells[6][2].fill = true;  cells[6][3].fill = true;
  cells[6][7].fill = true;  cells[6][15].fill = true;
  cells[6][19].fill = true;

  cells[7][2].fill = true;  cells[7][3].fill = true;
  cells[7][5].fill = true;  cells[7][7].fill = true;
  cells[7][9].fill = true;  cells[7][10].fill = true;
  cells[7][11].fill = true; cells[7][13].fill = true;
  cells[7][15].fill = true; cells[7][17].fill = true;
  cells[7][19].fill = true;

  cells[8][5].fill = true;  cells[8][9].fill = true;
  cells[8][11].fill = true; cells[8][13].fill = true;
  cells[8][17].fill = true;

  cells[9][1].fill = true;  cells[9][2].fill = true;
  cells[9][3].fill = true;  cells[9][5].fill = true;
  cells[9][6].fill = true;  cells[9][7].fill = true;
  cells[9][11].fill = true; cells[9][13].fill = true;
  cells[9][14].fill = true; cells[9][15].fill = true;
  cells[9][17].fill = true; cells[9][18].fill = true;
  cells[9][19].fill = true;

  cells[10][5].fill = true;  cells[10][9].fill = true;
  cells[10][11].fill = true; cells[10][13].fill = true;
  cells[10][17].fill = true; cells[10][19].fill = false;

  cells[11][2].fill = true;  cells[11][3].fill = true;
  cells[11][5].fill = true;  cells[11][7].fill = true;
  cells[11][9].fill = true;  cells[11][10].fill = true;
  cells[11][11].fill = true; cells[11][13].fill = true;
  cells[11][15].fill = true; cells[11][17].fill = true;
  cells[11][19].fill = true;

  cells[12][2].fill = true;  cells[12][3].fill = true;
  cells[12][7].fill = true;  cells[12][15].fill = true;
  cells[12][19].fill = true;

  cells[13][2].fill = true;  cells[13][3].fill = true;
  cells[13][5].fill = true;  cells[13][6].fill = true;
  cells[13][7].fill = true;  cells[13][8].fill = true;
  cells[13][9].fill = true;  cells[13][11].fill = true;
  cells[13][12].fill = true; cells[13][13].fill = true;
  cells[13][15].fill = true; cells[13][17].fill = true;
  cells[13][18].fill = true; cells[13][19].fill = true;

  cells[14][19].fill = true;

  cells[15][2].fill = true;  cells[15][3].fill = true;
  cells[15][5].fill = true;  cells[15][7].fill = true;
  cells[15][8].fill = true;  cells[15][9].fill = true;
  cells[15][11].fill = true; cells[15][12].fill = true;
  cells[15][13].fill = true; cells[15][15].fill = true;
  cells[15][16].fill = true; cells[15][17].fill = true;
  cells[15][19].fill = true;

  cells[16][2].fill = true;  cells[16][3].fill = true;
  cells[16][5].fill = true;  cells[16][7].fill = true;
  cells[16][9].fill = true;  cells[16][11].fill = true;
  cells[16][13].fill = true; cells[16][15].fill = true;
  cells[16][19].fill = true;

  cells[17][7].fill = true;  cells[17][9].fill = true;
  cells[17][11].fill = true; cells[17][13].fill = true;
  cells[17][17].fill = true;

  for(var col=0; col < colCount; col++){
      cells[col][0].fill = true;
      cells[col][rowCount-1].fill = true;
  }

  for(var row=0; row < rowCount; row++){
      cells[0][row].fill = true;
      cells[colCount-1][row].fill = true;
  }

  for(var col=0; col < colCount; col++){
      for(var row=0; row < rowCount; row++){
          cells[col][row].food = !cells[col][row].fill;
      }
  }
}

function draw(){
  for(var i = 0; i < colCount; i++){
    for(var j = 0; j < rowCount; j++){
      cells[i][j].draw();
    }
  }
  bird.draw();
  fruit.draw();
}
function Cell(xcor, ycor){
  this.xcor = xcor;
  this.ycor = ycor;
  this.width = gridWidth;
  this.height = gridHeight;
  this.fill = false;
  this.food = false;

  this.draw = function(){
    if(this.fill){
      context.fillStyle = 'red';
      context.fillRect(
        this.xcor * this.width,
        this.ycor * this.height,
        this.width, this.height
      );
    }
    if(this.food){
      context.fillStyle = 'yellow';
      context.fillRect(
        this.xcor * this.width + 8,
        this.ycor * this.height + 8,
        4, 4
      );
    }
  }
}

function Bird(xcor, ycor){
  this.xcor = xcor;
  this.ycor = ycor;
  this.width = gridWidth;
  this.height = gridHeight;

  this.draw = function(){
    context.fillStyle = 'yellow';
    context.fillRect(this.xcor * this.width, this.ycor * this.height, this.width, this.height);
  }
}

function Fruit(xcor, ycor){
  this.xcor = xcor;
  this.ycor = ycor;
  this.width = gridWidth;
  this.height = gridHeight;

  this.draw = function(){
    this.draw = function(){
      context.fillStyle = 'white';
      context.fillRect(this.xcor * this.width, this.ycor * this.height, this.width, this.height);
    }
  }
}
