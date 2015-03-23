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

void setup() {
  size(SKETCH_WIDTH, SKETCH_HEIGHT);
  
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
  image(mapTiles[0], 0, 0);
  maskTiles[0].mask(testMask);
  image(maskTiles[0], 0 , 0);
}

void mouseDragged() {
  pushMatrix();
  translate(mouseX, mouseY);
  popMatrix(); 
  println("boo");
}


