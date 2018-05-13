const canvas = document.getElementById('canvas');
const context = canvas.getContext("2d");
const gridWidth = 20;
const gridHeight = 20;
const colCount = 19;
const rowCount = 22;
const dir = {left: 0, right: 1, top: 2, down: 3, stop: 4};
const canvasWidth = gridWidth * colCount;
const canvasHeight = gridHeight * rowCount;
canvas.width = canvasWidth;
canvas.height = canvasHeight;
context.fillStyle = 'blue';
context.fillRect(0, 0, canvasWidth, canvasHeight);
var gameOver = false;
var started = false;
var score = 0;
var cells = [];
var bird1 = new Bird(8, 10, 'turquoise');
var bird2 = new Bird(9, 10, 'violet');
var bird3 = new Bird(10, 10, 'yellow');
var birds = [bird1, bird2, bird3];
var fruit = new Fruit(9, 12);
var curDir = dir.stop;
var nextDir = dir.stop;

initialize();
setFill();
draw();

function run(){
  setInterval(function(){
    updateFruit();
    draw();
  }, 350);

  setInterval(function(){
    updateBirds();
  },500)
}

run();

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

function updateFruit(){
  if(gameOver){
    return;
  }
  if(nextDir == dir.right) {
    if(fruit.xcor === 17 && fruit.ycor === 10){
      fruit.xcor = 18;
      return;
    }
    else if(fruit.xcor === 18 && fruit.ycor === 10){
      fruit.xcor = 0;
      return;
    }
    else if(!cells[fruit.xcor+1][fruit.ycor].fill){
        fruit.xcor++;
        if(cells[fruit.xcor][fruit.ycor].food){
          cells[fruit.xcor][fruit.ycor].food = 0;
          score += 5;
        }
        curDir = nextDir;
        return;
    }
  }
  else if(nextDir == dir.left){
    if(fruit.xcor === 1 && fruit.ycor === 10){
      fruit.xcor = 0;
      return;
    }
    else if(fruit.xcor === 0 && fruit.ycor === 10){
      fruit.xcor = 18;
      return;
    }
    else if(!cells[fruit.xcor-1][fruit.ycor].fill){
        fruit.xcor--;
        if(cells[fruit.xcor][fruit.ycor].food){
          cells[fruit.xcor][fruit.ycor].food = 0;
          score += 5;
        }
        curDir = nextDir;
        return;
    }
  }
  else if(nextDir == dir.top){
      if(!cells[fruit.xcor][fruit.ycor-1].fill){
          fruit.ycor--;
          if(cells[fruit.xcor][fruit.ycor].food){
            cells[fruit.xcor][fruit.ycor].food = 0;
            score += 5;
          }
          curDir = nextDir;
          return;
      }
  }
  else if(nextDir == dir.down){
      if(!cells[fruit.xcor][fruit.ycor+1].fill){
          fruit.ycor++;
          if(cells[fruit.xcor][fruit.ycor].food){
            cells[fruit.xcor][fruit.ycor].food = 0;
            score += 5;
          }
          curDir = nextDir;
          return;
      }
  }

  if(curDir == dir.right){
    if(fruit.xcor === 17 && fruit.ycor === 10){
      fruit.xcor = 18;
      return;
    }
    else if(fruit.xcor === 18 && fruit.ycor === 10){
      fruit.xcor = 0;
      return;
    }
    else if(!cells[fruit.xcor+1][fruit.ycor].fill){
        fruit.xcor++;
        if(cells[fruit.xcor][fruit.ycor].food){
          cells[fruit.xcor][fruit.ycor].food = 0;
          score += 5;
        }
    }
  }
  else if(curDir == dir.left){
    if(fruit.xcor === 1 && fruit.ycor === 10){
      fruit.xcor = 0;
      return;
    }
    else if(fruit.xcor === 0 && fruit.ycor === 10){
      fruit.xcor = 18;
      return;
    }
    else if(!cells[fruit.xcor-1][fruit.ycor].fill){
        fruit.xcor--;
        cells[fruit.xcor][fruit.ycor].food = 0;
    }
  }
  else if(curDir == dir.top){
      if(!cells[fruit.xcor][fruit.ycor-1].fill){
          fruit.ycor--;
          if(cells[fruit.xcor][fruit.ycor].food){
            cells[fruit.xcor][fruit.ycor].food = 0;
            score += 5;
          }
      }
  }
  else if(curDir == dir.down){
      if(!cells[fruit.xcor][fruit.ycor+1].fill){
          fruit.ycor++;
          if(cells[fruit.xcor][fruit.ycor].food){
            cells[fruit.xcor][fruit.ycor].food = 0;
            score += 5;
          }
      }
  }
}

function updateBirds(){
  if(!started){
    return;
  }
  for(var count = 0; count < birds.length; count++){
    var queue = [];
    var visited = []
    for(var i = 0; i < colCount; i++){
      var col = [];
      for(var j = 0; j < rowCount; j++){
        col.push(0);
      }
      visited.push(col);
    }
    var path = [];
    for(var i = 0; i < colCount; i++){
      var col = [];
      for(var j = 0; j < rowCount; j++){
        col.push(new Cell(i, j));
      }
      path.push(col);
    }
    queue.push(cells[birds[count].xcor][birds[count].ycor]);
    visited[birds[count].xcor][birds[count].ycor] = 1;

    while(queue.length){
      var cell = queue.shift();
      if(cell.xcor === fruit.xcor && cell.ycor === fruit.ycor){
        break;
      }

      if(checkPath(count, cells[cell.xcor+1][cell.ycor])){
          if(!cells[cell.xcor+1][cell.ycor].fill){
          if(!visited[cell.xcor+1][cell.ycor]){
            path[cell.xcor+1][cell.ycor] = cell;
            queue.push(cells[cell.xcor+1][cell.ycor]);
            visited[cell.xcor+1][cell.ycor] = 1;
          }
        }
      }
      if(checkPath(count, cells[cell.xcor][cell.ycor+1])){
        if(!cells[cell.xcor][cell.ycor+1].fill){
          if(!visited[cell.xcor][cell.ycor+1]){
            path[cell.xcor][cell.ycor+1] = cell;
            queue.push(cells[cell.xcor][cell.ycor+1]);
            visited[cell.xcor][cell.ycor+1] = 1;
          }
        }
      }
      if(checkPath(count, cells[cell.xcor-1][cell.ycor])){
        if(!cells[cell.xcor-1][cell.ycor].fill){
          if(!visited[cell.xcor-1][cell.ycor]){
            path[cell.xcor-1][cell.ycor] = cell;
            queue.push(cells[cell.xcor-1][cell.ycor]);
            visited[cell.xcor-1][cell.ycor] = 1;
          }
        }
      }
      if(checkPath(count, cells[cell.xcor][cell.ycor-1])){
        if(!cells[cell.xcor][cell.ycor-1].fill){
          if(!visited[cell.xcor][cell.ycor-1]){
            path[cell.xcor][cell.ycor-1] = cell;
            queue.push(cells[cell.xcor][cell.ycor-1]);
            visited[cell.xcor][cell.ycor-1] = 1;
          }
        }
      }
    }
    var nextCell = fruit;
    while(!checkNext(path[nextCell.xcor][nextCell.ycor], path)){
       nextCell = path[nextCell.xcor][nextCell.ycor];
    }
    if(!checkNext(nextCell, path)){
      birds[count].xcor = nextCell.xcor;
      birds[count].ycor = nextCell.ycor;
    }
    if(birds[count].xcor === fruit.xcor && birds[count].ycor === fruit.ycor){
      gameOver = true;
    }
  }
}

function checkNext(cell, path){
  var newCell = path[cell.xcor][cell.ycor];
  if(cell.xcor === newCell.xcor && cell.ycor === newCell.ycor){
    return true;
  }
  else{
    return false;
  }
}

function checkPath(index, cell){
  let bird2 = birds[1];
  let bird3 = birds[2];
  if(index === 1){
    bird2 = birds[0];
    bird3 = birds[2];
  }
  else if(index === 2){
    bird2 = birds[0];
    bird3 = birds[1];
  }
  if(cell.xcor === bird2.xcor && cell.ycor === bird2.ycor){
    return false;
  }
  if(cell.xcor === bird3.xcor && cell.ycor === bird3.ycor){
    return false;
  }
  return true;
}

function draw(){
    context.fillStyle = 'blue';
    context.fillRect(0, 0, canvasWidth, canvasHeight);
    for(var i = 0; i < colCount; i++){
      for(var j = 0; j < rowCount; j++){
        cells[i][j].draw();
      }
    }
    fruit.draw();
    for(var count = 0; count < birds.length; count++){
      birds[count].draw();
    }
    context.fillStyle = 'springgreen';
    context.fillRect(0, 10 * gridHeight, gridWidth, gridHeight);
    context.fillRect(18 * gridWidth, 10 * gridHeight, gridWidth, gridHeight);

  if(gameOver) {
    context.fillStyle = "white";
    context.font = "40px Sherif";
    var text = "Game over";
    var xcor = canvasWidth / 2 - context.measureText(text).width / 2;
    context.fillText(text, xcor, 200);
  }

  if(!started) {
    context.fillStyle = "white";
    context.font = "40px Sherif";
    var text = "Press enter to start";
    var xcor = canvasWidth / 2 - context.measureText(text).width / 2;
    context.fillText(text, xcor, 200);
  }

  document.getElementById('score').innerHTML = 'Score: ' + score;
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
        context.fillStyle = 'springgreen';
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

function Bird(xcor, ycor, color){
    this.xcor = xcor;
    this.ycor = ycor;
    this.width = gridWidth;
    this.height = gridHeight;
    this.color = color;

    this.draw = function(){
      context.fillStyle = color;
      context.fillRect(
        this.xcor * this.width + 2,
        this.ycor * this.height + 2,
        this.width - 4, this.height - 4
      );
    }
  }

function Fruit(xcor, ycor){
    this.xcor = xcor;
    this.ycor = ycor;
    this.width = gridWidth;
    this.height = gridHeight;

    this.draw = function(){
      this.draw = function(){
        context.fillStyle = 'red';
        context.fillRect(
          this.xcor * this.width + 4,
          this.ycor * this.height + 4,
          this.width - 8, this.height - 8
        );
      }
    }
  }

document.addEventListener('keydown', function(event) {
  if(event.keyCode === 13){
    started = true;
  }
  if(!started){
    return;
  }
  else if (event.keyCode === 37) {
    nextDir = dir.left;
  }
  else if (event.keyCode === 38) {
    nextDir = dir.top;
  }
  else if (event.keyCode === 39) {
    nextDir = dir.right;
  }
  else if (event.keyCode === 40) {
    nextDir = dir.down;
  }
});
