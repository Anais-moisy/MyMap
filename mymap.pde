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


void setup() {
  size(SKETCH_WIDTH, SKETCH_HEIGHT);
  
  createMapTiles();
  createMaskTiles();
  noLoop();  // Run once and stop
}

void draw() {
  background(0);
  image(mapTiles[0], 0, 0);
  image(maskTiles[0], 0 , 0);
}







