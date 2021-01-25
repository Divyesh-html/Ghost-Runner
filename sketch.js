var tower_image
var tower
var ghost
var ghost_image
var ghost_sound
var doorImage
var gameState = 1
var invisibleBlock
var invisibleBlockGroup
var climberGroup
var doorGroup
var gameoverImage

function preload() {
  tower_image = loadImage("tower.png")

  ghost_image = loadImage("ghost-standing.png")

  ghost_sound = loadSound("spooky.wav")
  doorImage = loadImage("door.png")
  climberImage = loadImage("climber.png")

  gameover = loadImage("gameover.png")
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300, 100, 20, 20);
  tower.addImage(tower_image);
  tower.velocityY = 5

  ghost = createSprite(300, 300, 20, 20);
  ghost.addImage(ghost_image);
  ghost.scale = 0.25
  ghost_sound.loop();


  invisibleBlockGroup = new Group();
  climberGroup = new Group();
  doorGroup = new Group();

}

function draw() {
  background("black");


  if (gameState === 1) {

    doors();

    if (tower.y > 400) {
      tower.y = 300
    }

    if (keyDown("left_arrow")) {
      ghost.x = ghost.x - 5
    }
    if (keyDown("space")) {
      ghost.velocityY = -5
    }
    ghost.velocityY = ghost.velocityY + 0.8
    if (keyDown("right_arrow")) {
      ghost.x = ghost.x + 5
    }

    if (invisibleBlockGroup.isTouching(ghost) || ghost.y > 600) {
      ghost.destroy();
      gameState = 0;
    }
    if (climberGroup.isTouching(ghost)) {
      ghost.velocityY = 0
    }
  }
  if (gameState === 0) {
    background("black")
    gameoverImage = createSprite(300, 300, 1, 1)
    gameoverImage.addImage(gameover)
    tower.destroy()
  }

  drawSprites();

}

function doors() {
  if (frameCount % 60 === 0) {
    door = createSprite(300, 100, 10, 10)
    door.velocityY = +5
    door.addImage(doorImage)
    door.x = random(100, 400)
    door.depth = ghost.depth - 1
    doorGroup.add(door);

    climber = createSprite(300, 165, 10, 10)
    climber.addImage(climberImage)
    climber.velocityY = +5
    climber.x = door.x
    //climber.depth = ghost.depth - 1
    climberGroup.add(climber)

    invisibleBlock = createSprite(300, 165, 10, 10)
    invisibleBlock.debug = true
    invisibleBlock.velocityY = +5
    invisibleBlock.x = climber.x
    invisibleBlock.visible = true;
    invisibleBlockGroup.add(invisibleBlock)
    invisibleBlock.width = climber.width
    invisibleBlock.height = 0.5

  }




}