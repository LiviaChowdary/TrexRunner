class Reset{
 constructor(){
    this.reset = createButton('Reset');
 }
}
this.reset.mousePressed(()=>{
    gameState = PLAY;
    
    gameOver.visible = false;
    restart.visible = false;
    
    ObstaclesGroup.destroyEach();
    CloudsGroup.destroyEach();
    
    trex.addAnimation("running",trex_running)
    
    count = 0;
  });
