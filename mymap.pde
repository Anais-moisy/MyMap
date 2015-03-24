/**
 * MyMap Visualisation 
 * 
 * Reveals map from beneath a mask layer.
 * Accepts GPS data from wearable trackers.
 * Animates emerging paths.
 *
 * By Anais Moisy, Chris Barker
 * with thanks to Jen Southern and Chris Speed 
 */


PImage mapTiles[];
PImage maskTiles[];
PImage testMask;

int x,y = 0;

MouseTracker mt;


void setup() {
  size(SKETCH_WIDTH, SKETCH_HEIGHT);
  
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
  background(0);
  
  if( SKETCH_DRAGGABLE )
  {
    translate(x,y);
  }
  
  image(mapTiles[0], 0, 0);
//  maskTiles[0].mask(testMask);
  image(maskTiles[0], 0 , 0);
  frame.setTitle(int(frameRate) + " fps");
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

