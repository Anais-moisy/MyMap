/**
 * MyMap Visualisation 
 * 
 * Reveals map from beneath a mask layer.
 * Accepts GPS data from wearable trackers.
 * Animates emerging paths.
 *
 * By Chris Barker, Anais Moisy, Jen Southern and Chris Speed 
 */

float[][] distances;
float maxDistance;
int spacer;

PImage imgTiles;

void setup() {
  size(640, 360);
  maxDistance = dist(width/2, height/2, width, height);
  distances = new float[width][height];
  for (int y = 0; y < height; y++) {
    for (int x = 0; x < width; x++) {
      float distance = dist(width/2, height/2, x, y);
      distances[x][y] = distance/maxDistance * 255;
    }
  }
  spacer = 10;
  
  String url = "https://maps.googleapis.com/maps/api/staticmap?center=-15.800513,-47.91378&zoom=11&size=500x500&scale=2&format=png32.png";
  imgTiles = loadImage(url, "png");
  
  noLoop();  // Run once and stop
}

void draw() {
  background(0);
  // This embedded loop skips over values in the arrays based on
  // the spacer variable, so there are more values in the array
  // than are drawn here. Change the value of the spacer variable
  // to change the density of the points
  for (int y = 0; y < height; y += spacer) {
    for (int x = 0; x < width; x += spacer) {
      stroke(distances[x][y]);
      point(x + spacer/2, y + spacer/2);
    }
  }
  
  image(imgTiles, 0, 0, 400, 400);
}



