//JSAIS LE CODE EST MOCHE WLH

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
var width = window.innerWidth;
var height = window.innerHeight;

function resize() {
  width = window.innerWidth,
  height = window.innerHeight,
  ratio = window.devicePixelRatio;
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";
  context.scale(ratio, ratio);
}
window.onresize = function() {
  resize();
};
window.onload = function() {
  resize();
  window.requestAnimationFrame(animate);
}


document.addEventListener('contextmenu', event => event.preventDefault());

document.addEventListener('mousemove', (p) => {
  const t = canvas.getBoundingClientRect();
  mouse[0] = (p.pageX - t.left);
  mouse[1] = (p.pageY - t.top);
}, false);

document.onmousedown = function (e) {
  if (e.button == 0) {
    const target = viewToCoord(mouse[0], mouse[1]).map(e => Math.floor(e));
    if (selected[0] >= 0 && selected[0] < sizeX && selected[1] >= 0 && selected[1] < sizeY
    && target[0] >= 0 && target[0] < sizeX && target[1] >= 0 && target[1] < sizeY) {
      const c1 = grid[selected[0]][selected[1]];
      const c2 = grid[target[0]][target[1]];
      if(c1 != undefined && c2 != undefined){
        peg.play(c1, c2);
        selected[0] = -1;
        selected[1] = -1;
      }
    }
    selected[0] = target[0];
    selected[1] = target[1];
  }
};

document.onmouseup = function (e) {
  if (e.button == 0) {
  }
};

function coordToView(i, j){
  return [(width/2)-(size*sizeX/2)+i*size, (height/2)-(size*sizeY/2)+j*size];
}

function viewToCoord(x, y){
  return [(x-(width/2)+(size*sizeX/2))/size, (y-(height/2)+(size*sizeY/2))/size];
}


const mouse = [];
const selected = [-1, -1];
const peg = new Peg();
const sizeX = 7;
const sizeY = 7;

const grid = [];
for (let i = 0; i < sizeX; i++) {
  grid[i] = [];
  for (let j = 0; j < sizeY; j++) {
    if ((i > 1 && i < 5)||(j > 1 && j < 5)) {
      const c = new Cell();
      grid[i][j] = c;
      peg.cells.push(c)
    }
  }
}
for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[i].length; j++) {
    if(grid[i][j]!=undefined){
      let before = null;
      let after = null;
      if(grid[i-1] != undefined){
        if (grid[i-1][j] != undefined) {
          before = grid[i-1][j];
        }
      }
      if(grid[i+1] != undefined){
        if (grid[i+1][j] != undefined) {
          after = grid[i+1][j];
        }
      }
      if ((before == null) ^ (after == null)) {
        grid[i][j].opposites.set(before || after, null);
      }else if ((before != null) && (after != null)){
        grid[i][j].opposites.set(before, after);
        grid[i][j].opposites.set(after, before);
      }

      before = null;
      after = null;
      if(grid[i][j-1] != undefined){
        before = grid[i][j-1];
      }
      if(grid[i][j+1] != undefined){
          after = grid[i][j+1];
      }
      if ((before == null) ^ (after == null)) {
        grid[i][j].opposites.set(before || after, null);
      }else if ((before != null) && (after != null)){
        grid[i][j].opposites.set(before, after);
        grid[i][j].opposites.set(after, before);
      }
    }
  }
}

grid[3][3].rock = false;
let size = 90;

function animate() {
  context.clearRect(0, 0, width, height);
  context.beginPath();
  context.fillStyle = "#660099";
  context.rect(0, 0, width, height);
  context.fill();
  context.closePath();


  for (let i in grid) {
    for (let j in grid[i]) {
      if(grid[i][j]!=undefined){
        context.fillStyle = "#99ff66";
        context.beginPath();
        const c = coordToView(i, j)
        context.rect(c[0]+1, c[1]+1, size-2, size-2);
        context.fill();
        context.closePath();
        if (grid[i][j].rock) {
          if (i == selected[0] && j == selected[1]) {
            context.fillStyle = "#a8a8a8";
          }else {
            context.fillStyle = "#656565";
          }
          context.beginPath();
          context.arc(c[0]+size/2, c[1]+size/2, size/2 - 5, 0, Math.PI*2, false);
          context.fill();
          context.closePath();
          context.shadowColor = "rgba(0,0,0,0)";
        }
      }
    }
  }

  window.requestAnimationFrame(animate);
}
