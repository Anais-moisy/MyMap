/*
 * MyMap Visualisation 
 * 
 * Reveals map from beneath a mask layer.
 * Accepts GPS data from wearable trackers.
 * Animates emerging paths.
 *
 * By Anais Moisy, Chris Barker
 * with thanks to Jen Southern and Chris Speed 
 */

boolean moveFlag;

PImage mapTiles[];
PImage maskTiles[];
PImage testMask;

WayPoint[] waypoints[];

ControlApplet controls;
PFrame f;

int x,y = 0;

MouseTracker mt;


void setup() {
  frameRate(40);
  
  parseXML();
  moveFlag = false;
  
  size(SKETCH_WIDTH, SKETCH_HEIGHT);
  
  f = new PFrame();
  
  mt = new MouseTracker();
  
  createMapTiles();
  createMaskTiles();
  
  testMask = createImage(getTileSize().width*SCALE_FACTOR, getTileSize().height*SCALE_FACTOR, RGB);
  for (int i = 0; i < testMask.pixels.length; i++) {
    if(i%5==0 || i%3==0)
    {
      testMask.pixels[i] = color(0);
    }else
    {
      testMask.pixels[i] = color(255);
    }
  }
  testMask.updatePixels();


}

void draw() {
  int fc = frameCount;
  
  background(0);
  
  if( fc % 20 == 0 )
  {
//    println("tick");
  }
  
  if( SKETCH_DRAGGABLE )
  {
    translate(x,y);
  }
  
  int tileIndex = 0;
  for(int y=-1; y<3; y++)
  {
    for(int x=-1; x<3; x++)
    {
      image(mapTiles[tileIndex], x*(getTileSize().width*SCALE_FACTOR), y*(getTileSize().height*SCALE_FACTOR));
      image(maskTiles[tileIndex], x*(getTileSize().width*SCALE_FACTOR), y*(getTileSize().height*SCALE_FACTOR));
      tileIndex++;
    }
  }
  
//maskTiles[0].mask(testMask);
//
  frame.setTitle(int(frameRate) + " fps");
  
  
  controls.redraw();
}

void mouseDragged() {
  mt.setX(mouseX);
  mt.setY(mouseY);
  
  x = (-mt.getXOffset() / 5) + x;
  y = (-mt.getYOffset() / 5) + y;
}

void mousePressed()
{
  mt.setOrigin(mouseX, mouseY);
}

void mouseReleased()
{
}

boolean canDrag()
{
  if( x>(-SKETCH_WIDTH*2)
      && x<(SKETCH_WIDTH*2)
      && y>(-SKETCH_HEIGHT*2)
      && y<(SKETCH_HEIGHT*2)
     )
    {
      return true;
    }
    else
    {
      return false;
    }
}

void playVis()
{
}

