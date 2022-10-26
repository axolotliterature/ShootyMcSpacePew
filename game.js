// ----------------------------VARIABLES-----------------------------

const WIDTH = 800;
const HEIGHT = 800;

const bulletSpeed = 10;
const enemiesActive = 4;

let MENU = 0;
let isPlaying = false;
let isGameOver = false;

let score = 0;
let scoreElem;

let ship;
let enemies = [];
let myBullets = [];
let enemyBullets = [];

// function preload() {
//   let ship = loadImage('img/viper-mk-ii-1.png');
// }

// ----------------------------SETUP-----------------------------

function setup() {
  
  let canvas = createCanvas(WIDTH, HEIGHT);
  canvas.parent("gameBox");
  frameRate(60);
  
  ship = new Ship();
  
//   Set Interval for Enemy spawn
  setInterval(function() {
    // let enemyx = random(50, width+50);
    let enemyx = (WIDTH/2 + (Math.floor(Math.random() * (WIDTH/2 - (0-WIDTH/2) +1) * ((Math.round(Math.random()) * 2) -1)) ));
        // (WIDTH/2 + Math.floor(Math.random() * WIDTH/2));
    let enemyy = 10;
    enemies.push(new Enemy(enemyx, enemyy));
  }, 1000);
  
  setInterval(function() {
    if (enemies.length > 1) {
      let rando = Math.floor(Math.random() * enemies.length);
      enemies[rando].fireGuns();
      enemies[rando].fireGuns();
      enemies[rando].fireGuns();
    }
  }, 300)

  
//   SCORE - OLD
  // scoreElem = document.getElementById("score");
  // document.getElementById("score").style.display = "block";
  // scoreElem.position(20, 20);
  // scoreElem.id = 'score';
  // scoreElem.parent("gameBox");
  // scoreElem.style('color', 'white');

  
}

// ----------------------------DRAW-----------------------------

function draw() {
  background(30);

  // PLAY/PAUSE FUNCTION WRAPPER
  if (isPlaying === true) {

  scoreElem = document.getElementById("score");
  // scoreElem.innerHTML = 'Score = ' + score;
  // console.log(score);
  
//   Creates player ship
  ship.show();
  updateShip();
  
//   Creates enemy ships
  for (let i = 0; i < enemies.length; i++) {
    enemies[i].show();
    enemies[i].move();
    // console.log(enemies.length);
    
    //   Checks collision between enemy ships and player
    for (let j = 0; j < enemies.length; j++) {
      if (enemies[i].checkCollision(ship)) {
        ship.explode();
       enemies[i].explode();
        // console.log("Collision_Detected");
      }
    }
  }
  
  // Creates myBullets
  for (let i = 0; i < myBullets.length; i++){
    myBullets[i].show();
    myBullets[i].move();
    // console.log(myBullets.length);
    
    //   Checks collision between myBullets and enemies
    for (let j = 0; j < enemies.length; j++) {
      if (myBullets[i].checkCollision(enemies[j])) {
        enemies[j].explode();
        myBullets[i].consume();
        // console.log("Collision_Detected");
      }
    }
  }
  
//   Creates enemyBullets
  for (let i = 0; i < enemyBullets.length; i++){    
    enemyBullets[i].show();
    enemyBullets[i].move();
    // console.log(enemyBullets.length);
    
    //   Checks collision between enemyBullets and player ship
    if (enemyBullets[i].checkCollision(ship)) {
      ship.explode();
      enemyBullets[i].consume();
    }
  }

  
//   --------------------REMOVALS FOR COLLISION----------------------------
  
//   removes myBullet on collision w/ enemy
  for (let i = myBullets.length-1; i >= 0; i--) {
    if (myBullets[i].kill) {
      myBullets.splice(i, 1);
    }
  }
//   removes enemy ship on collision w/ myBullet
  for (let i = enemies.length-1; i >= 0; i--) {
    if (enemies[i].kill) {
      enemies.splice(i, 1);
      score++;
      scoreElem.innerHTML = 'Score = ' + score;
      // console.log(score);
    }
  }
//   removes enemyBullet on collision w/ player
  for (let i = enemyBullets.length-1; i >= 0; i--) {
    if (enemyBullets[i].kill) {
      enemyBullets.splice(i, 1);
    }
  }
//   removes enemy ship on collision w/ player
for (let i = enemies.length-1; i >= 0; i--) {
  if (enemies[i].kill) {
    enemies.splice(i, 1);
  }
}
//   game over on player ship collision with enemy ship or bullet
    if (ship.kill) {
      gameOver();
  }
  
//   --------------------REMOVALS FOR ARRAY SIZE MITIGATION-----------------
  for (let i = myBullets.length-1; i >= 20; i--) {
      myBullets.shift();
  }
  for (let i = enemyBullets.length-1; i >= 40; i--) {
      enemyBullets.shift();
  }
//   Removes front element from array at 6 enemies
  for (let i = enemies.length-1; i >= 6; i--) {
      enemies.shift();
  }

// END OF PLAY/PAUSE FUNCTION WRAPPER
  }
  
  if (isGameOver === true) {
    background('rbga(30, 30, 30, 0.6)');
    textSize(50) 
    fill(130);
    text('GAME OVER', (WIDTH/2)-150, (HEIGHT/2));
  }

  if (isPlaying === false && isGameOver === false) {
    background('rbga(30, 30, 30, 0.6)');
    textSize(50) 
    fill(130);
    text('Click mouse to Start', (WIDTH/2)-220, (HEIGHT/2));

  }
  
  
  
  

  // -------------------- PAUSE / START MENU --------------------------------

  // function mouseClicked() {
    // console.log(mouseX, mouseY);
  //   return false;
  // }
  // background('rgba(30, 30, 30, 0.6)');
  // fill('rgba(70, 70, 70, 0.7)');
  // rect(WIDTH/2, (HEIGHT/2)-100, 110, 45);
  // fill('rgba(70, 70, 70, 0.7)');
  // rect(WIDTH/2, (HEIGHT/2), 110, 45);
  // textSize(30)
  // fill(160);
  // text('START', (WIDTH/2)-48, (HEIGHT/2)-90);
  // text('RESET', (WIDTH/2)-50, (HEIGHT/2)+10);

  // if (MENU == 1) {
  //   background(0, 255, 0)
  //   fill(0)
  //   textSize(20)
  //   text('Right Click to return to MENU', 525, 30)
  //   if (mouseButton == RIGHT) {
  //     MENU = 0
  //   }
  // } // START GAME
  // if (MENU == 2) {
  //   background(255, 0, 255)
  //   textSize(20)
  //   text('Right Click to return to MENU', 525, 30)
  //   textSize(30)
  //   if (mouseButton == RIGHT) {
  //     MENU = 0
  //   }
  // } // INSTRUCTIONS
  // if (MENU == 3) {
  //   background(255, 0, 0)
  //   textSize(75)
  //   text('COME AGAIN SOON!', 25, height / 2)
  // } // EXIT 

// function mouseClicked() {
//   if (MENU == 0) {
//     if (mouseX < 345 && mouseX > 445) {
//       if (mouseY < 285 && mouseY > 320) {
//         // MENU = 1
//         console.log('MENU 1');
//       }
//       if (mouseY < 380 && mouseY > 420) {
//         // MENU = 2
//         console.log('MENU 2');
//       }
//     }
//   }
// }
   
}
// END OF DRAW


// ---------------------CONTROLS & FUNCTIONS---------------------

// Control for moving ship left/right
// Allows user to hold key for continuous movement
function updateShip () {
  if (keyIsDown(RIGHT_ARROW) && ship.x <= width-10) {
    ship.move(1);
  }
  else if (keyIsDown(LEFT_ARROW) && ship.x >= width-(width-10)) {
    ship.move(-1);
  }
}

// Control for firing cannons w/ spacebar once per key press
function keyPressed() {
  if (keyCode == 32) {
    let bullet = new MyBullet(ship.x, height-30);
    myBullets.push(bullet);
    
  //   for (i = enemies.length -1; i <= 10; i--){
  //   let ebullet = new EnemyBullet(enemies[i].x, enemies[i].y);
  //   enemyBullets.push(ebullet);
  // }
  }
}

function gameOver() {
  isGameOver = true;
  isPlaying = false;
}

function resetGame() {
  location.reload();
}

// ENABLES PLAY/PAUSE ON MOUSE CLICK
function touchEnded() {
  if (isGameOver === true){
    location.reload();
  }
  isPlaying = !isPlaying;
}

