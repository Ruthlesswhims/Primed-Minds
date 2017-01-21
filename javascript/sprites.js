//Changing the sprites' animations
//position and transformations: rotation, scale, mirror
//move the mouse and click
//press and hold the up and down keys

var dot, bg;

function setup() {
  createCanvas(1000,500);
  
  //create a sprite and add the 3 animations
  dot = createSprite(100, 100, 5, 10);
  dot.scale = 0.07;
  
  //label, first frame, last frame
  //the addAnimation method returns the added animation
  //that can be store in a temporary variable to change parameters
  var myAnimation = dot.addAnimation("standing", "assets/bridges/WalkingMonster1.png");
  //offX and offY is the distance of animation from the center of the sprite
  //in this case since the animations have different heights i want to adjust
  //the vertical offset to make the transition between floating and moving look better
  // myAnimation.offY = 18;
  
  var walking = dot.addAnimation("walking", "assets/bridges/WalkingMonster1.png", "assets/bridges/WalkingMonster2.png");
  
  var drowning = dot.addAnimation("drowning", "assets/bridges/WaterMonster1.png", "assets/bridges/WaterMonster2.png", "assets/bridges/WaterMonster3.png");
  
  // slow down the animation
  walking.frameDelay = 6;
  drowning.frameDelay = 12;

  bg = loadImage("assets/bridges/KonigMap.JPG"); 
}


var water = [];
water.push({x: 0.244, y: 0.14});
water.push({x: 0.45, y: 0.14}); 
water.push({x: 0.424, y:0.344}); 
water.push({x: 0.27, y: 0.326});

var time = -1; 
var last_x = -1;
var last_y = -1;
var x_direction, y_direction;

var path = [];

function draw() {
  background(bg);

  // debug purposes - press space bar
  if (keyIsDown(32)) {
    console.log(dot.position.x/width, (dot.position.y + 50)/height);
  }

  // check if dot hit water 
  // positions are adjusted so that it checks the dot's *foot* position
  if ( isInWater(dot.position.x, dot.position.y + 50) ) {
    // if just hit water, save the frameCount at which the water was hit 
    // also save the x and y at which you hit the water, and which direction you were walking
    if (time == -1) { 
      time = frameCount; 
      last_x = dot.position.x;
      last_y = dot.position.y;
      // save direction you were walking
      if (dot.velocity.x > 0) { x_direction = -1; } else { x_direction = 1; }
      if (dot.velocity.y > 0) { y_direction = -1; } else { y_direction = 1; }
    }

    // stop from moving 
    dot.velocity.x = 0; dot.velocity.y = 0;

    // change animation to drowning 
    dot.changeAnimation("drowning");

    // x frameCounts after hitting water initally, revert to position next to water, standing
    if ( (time+60) == frameCount) {
      dot.position.x = last_x + 10*x_direction;
      dot.position.y = last_y + 10*y_direction;
      time = -1; 
      dot.changeAnimation("standing");
    }

  } else if ( dot.position.x > width - 9 ) {
    // stop the dot from moving off the screen to the right side 
    dot.velocity.x = 0; 
    dot.position.x = width - 10;

  } else if ( dot.position.y > height - 9 ) {
    // stop the dot from moving off the screen to the bottom
    dot.velocity.y = 0;
    dot.position.y = height - 10;

  } else if ( dot.position.x < 9) {
    // stop the dot from moving off the screen to the left side
    dot.velocity.x = 0; 
    dot.position.x = 10;

  } else if ( dot.position.y < 9) {
    // stop the dot from moving off the screen to the top
    dot.velocity.y = 0; 
    dot.position.y = 10;

  } else {
    // if the mouse is pressed, move dot to that position
    if (mouseIsPressed) {
      dot.velocity.x = (mouseX - dot.position.x - 10);
      dot.velocity.y = (mouseY - dot.position.y - 10);
    } else {
      // up,down, left, and right arrow keys can also be used to move the dot
      // the keys are only used if dragging is not currently happening
      if(keyIsDown(UP_ARROW)) {
        dot.velocity.y = -5;
      } else if(keyIsDown(DOWN_ARROW)) {
        dot.velocity.y = 5;
      } else {
        dot.velocity.y = 0;
      }

      if(keyIsDown(LEFT_ARROW)) {
        dot.velocity.x = -5;
      } else if(keyIsDown(RIGHT_ARROW)) {
        dot.velocity.x = 5;
      } else {
        dot.velocity.x = 0;
      }
    }

    // add animations for walking 
    if ( dot.velocity.x < 0) {
      // flip to walk the other way
      dot.mirrorX(-1); 
    } else if ( dot.velocity.x > 0) {
      // flip back
      dot.mirrorX(1); 
    } 

    if (dot.velocity.x != 0 || dot.velocity.y != 0) {
      dot.changeAnimation("walking");
      // add the current position to the path
      // positions are adjusted down so that path is at feet
      path.push({x: dot.position.x, y: dot.position.y + 50});
    } else {
      dot.changeAnimation("standing");
    }
  }

  //draw the sprite
  drawSprites();

  // draw the path
  drawPath();
}

// draws the dot's path
function drawPath() {
  for (var i=1; i<path.length; i++) {
    line(path[i-1].x, path[i-1].y, path[i].x, path[i].y);
  }
}

// function that checks if dot walked into a water spot 
function isInWater(x, y) {
  var isInWater = false;

  // for(k=0; k<water.length; k++){
    polygon = water;
    // console.log('x', x, 'y', y);
    for(var i=0; i<polygon.length; i++) {
      // console.log(polygon[i].x * width, polygon[i].y * height);
    }

    var j = polygon.length - 1;
    for(var i = 0; i < polygon.length; i++) {
      if (polygon[i].y * height < y && polygon[j].y * height >= y || polygon[j].y * height < y && polygon[i].y * height >= y ) {
        if (polygon[i].x * width + (y - polygon[i].y * height) / (polygon[j].y * height - polygon[i].y * height * polygon[j].x * width - polygon[i].x * width) < x ) {
          isInWater = !isInWater;
        }
      }
      j = i;
    }
    return isInWater; 
}