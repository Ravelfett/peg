class Peg {
  constructor() {
    this.cells = [];
  }
  inDirection(start, dir) {
    return dir.opposites.get(start);
  }
  play(start, dir){
    if(start.rock && dir.rock){
      const t = this.inDirection(start, dir);
      if(t!=null){
        if(!t.rock){
          start.rock = false;
          dir.rock = false;
          t.rock = true;
        }
      }
    }
  }
}


class Cell{
  constructor() {
    this.rock = true;
    this.opposites = new Map();
  }
}
