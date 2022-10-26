// OBJECTS

// this.x = x coordinate
// this.y = y coordinate
// this.r = radius
// this.vel = velocity
// this.kill = mark object for removal


// -------------------------------PLAYER SHIP----------------------------
function Ship() {
  this.x = WIDTH/2;
  this.y = HEIGHT;
  this.r = 10;
  
  this.show = function() {
    // function draw() {
    //   image(ship, this.x, this.y);
    // }
    
    fill(255);
    rectMode(CENTER);
    rect(this.x, height-30, this.r*2, this.r*2);
  }
  
  this.move = function(direction) {
    this.x += direction*6.5;
  }
  
  this.explode = function() {
    this.kill = true;
  }
  
}

// -------------------------------ENEMY SHIP----------------------------
function Enemy(x, y) {
  this.x = x;
  this.y = y;
  this.r = 18;
  this.vel = 3
  this.xvel = 3
  this.startx = x;
  this.kill = false;
  
  this.show = function() {
    fill(100);
    ellipse(this.x, this.y, this.r*2, this.r*2);
  }
  
  this.move = function() {
    if (this.y <= HEIGHT) {
      if (this.startx >= WIDTH/2) {
        this.y += this.vel;
        this.x -= this.xvel;
      }
      if (this.startx <= WIDTH/2) {
        this.y += this.vel;
        this.x += this.xvel;
      }
    }

    if (this.y >= HEIGHT) {
      this.y = -10;
    }
  }
  
  this.checkCollision = function(enemy) {
    let d = dist(this.x, this.y, enemy.x, enemy.y);
    if (d < this.r + enemy.r) {
      return true;
    }
    else {
      return false;
    }
  }
  
  this.explode = function() {
    this.kill = true;
  }
  
  this.fireGuns = function() {
    let ebullet = new EnemyBullet(this.x, this.y);
      enemyBullets.push(ebullet);
  }
  
}


// -------------------------------PLAYER BULLETS----------------------------
function MyBullet(x, y) {
  this.x = x;
  this.y = y;
  this.r = 4;
  this.kill = false;
  this.offScreen = false;
  
  this.show = function() {
    noStroke();
    fill(255);
    ellipse(this.x, this.y, this.r*2, this.r*2);
  }
  
  this.checkCollision = function(enemy) {
    let d = dist(this.x, this.y, enemy.x, enemy.y);
    if (d < this.r + enemy.r) {
      return true;
    }
    else {
      return false;
    }
  }
  
  this.consume = function() {
    this.kill = true;
  }
  
  this.move = function() {
    this.y = this.y - bulletSpeed;
  }
}

// -------------------------------ENEMY BULLETS----------------------------
function EnemyBullet(x, y) {
  this.x = x;
  this.y = y;
  this.r = 4;
  this.kill = false;
  this.offScreen = false;
  
  this.show = function() {
    noStroke();
    fill(180);
    ellipse(this.x, this.y, this.r*2, this.r*2);
  }
  
  this.checkCollision = function(ship) {
    let d = dist(this.x, this.y, ship.x, ship.y);
    if (d < this.r + ship.r) {
      return true;
    }
    else {
      return false;
    }
  }
  
  this.consume = function() {
    this.kill = true;
  }
  
  this.move = function() {
    this.y = this.y + bulletSpeed;
  }
  
}

