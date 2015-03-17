/**
 * MyMap Visualisation 
 * 
 * Reveals map from beneath a mask layer.
 * Accepts GPS data from wearable trackers.
 * Animates emerging paths.
 *
 * By Chris Barker, Anais Moisy, Jen Southern and Chris Speed 
 */


PImage mapTiles[] = new PImage[1];
PImage maskTiles[];


void setup() {
  size(SKETCH_WIDTH, SKETCH_HEIGHT);
  mapTiles[0] = loadImage(generateTileURL(startLocation.lat, startLocation.lng), "png");
  
  createMaskTiles();
  noLoop();  // Run once and stop
}

void draw() {
  background(0);
  image(mapTiles[0], 0, 0);
  image(maskTiles[0], 0 , 0);
}







