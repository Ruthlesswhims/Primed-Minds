//Changing the sprites' animations
//position and transformations: rotation, scale, mirror
//move the mouse and click
//press and hold the up and down keys

var dot;

function setup() {
  createCanvas(800,300);
  
  //create a sprite and add the 3 animations
  dot = createSprite(400, 150, 50, 100);
  dot.scale = 0.15;
  
  //label, first frame, last frame
  //the addAnimation method returns the added animation
  //that can be store in a temporary variable to change parameters
  var myAnimation = dot.addAnimation("standing", "assets/bridges/WalkingMonster1.png");
  //offX and offY is the distance of animation from the center of the sprite
  //in this case since the animations have different heights i want to adjust
  //the vertical offset to make the transition between floating and moving look better
  // myAnimation.offY = 18;
  
  dot.addAnimation("walking", "assets/bridges/WalkingMonster1.png", "assets/bridges/WalkingMonster2.png");
  
  // dot.addAnimation("spinning", "assets/dot_spin0001.png", "assets/dot_spin0003.png");
  
}

function draw() {
  // background(600,600,600);  
  
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
    dot.changeAnimation("walking");
  } else if ( dot.velocity.x > 0) {
    // flip back
    dot.mirrorX(1); 
    dot.changeAnimation("walking");
  } else if ( dot.velocity.y != 0) {
    // if only moving vertically, mirror does not matter
    dot.changeAnimation("walking");
  } else {
    // not moving
    dot.changeAnimation("standing");
  }


  //if mouse is to the left
  // if(mouseX < dot.position.x - 10) {
  //   // dot.changeAnimation("walking");
  //   //flip horizontally
  //   dot.mirrorX(-1);
  //   dot_animation = WALKING;
  //   //negative x velocity: move left
  //   // dot.velocity.x = - 2;
  // }
  // else if(mouseX > dot.position.x + 10) {
  //   // dot.changeAnimation("walking");
  //   //unflip 
  //   dot.mirrorX(1);
  //   dot_animation = WALKING;
  //   // dot.velocity.x = (mouseX - dot.position.x);
  // }
  // else {
  //   //if close to the mouse, don't move
  //   dot.changeAnimation("standing");
  //   dot.velocity.x = 0;
  // }
  
  // if(mouseY < dot.position.y - 10 || mouseY > dot.position.y - 10) {
  //     dot.changeAnimation("walking");
  //     dot.velocity.y = (mouseY - dot.position.y);
  // } else {
  //     dot.changeAnimation("standing");
  // }
  
  //draw the sprite
  drawSprites();
}
