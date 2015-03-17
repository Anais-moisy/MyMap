// -------- //
//  helpers //
// -------- //
class ObjSize {
  public int width,height;
  
  public ObjSize(int w, int h){
    this.width = w;
    this.height = h;
  }
}

ObjSize getTileSize()
{
  int objWidth = int(SKETCH_WIDTH / (TILE_COLUMNS + 1));
  int objHeight = int(SKETCH_HEIGHT / (TILE_ROWS + 1));
  return new ObjSize(objWidth,objHeight);
}

String generateTileURL(float lat, float lng)
{
  String url = URL_BASE + "center=" + lat + "," + lng;
  url += "&zoom=" + ZOOM_LEVEL;
  url += "&size=" + getTileSize().width + "x" + getTileSize().height;
  url += "&scale=" + SCALE_FACTOR + "&format=png32.png&key=" + API_KEY;
  
  return url;
}

void createMaskTiles()
{
  maskTiles = new PImage[mapTiles.length];
  
  for(int i=0; i<maskTiles.length; i++)
  {
    maskTiles[i] = createImage(getTileSize().width*SCALE_FACTOR, getTileSize().height*SCALE_FACTOR, ARGB); 
    maskTiles[i].loadPixels();
    for (int x = 0; x < maskTiles[i].pixels.length; x++) {
      maskTiles[i].pixels[x] = color(190, 190, 190, 225); 
    }
    maskTiles[i].updatePixels();
  }
}

void createMapTiles()
{
  mapTiles = new PImage[TILE_ROWS*TILE_COLUMNS];
  
  for(int i=0; i<mapTiles.length; i++)
  {
    mapTiles[i] = loadImage(generateTileURL(START_LOCATION.lat, START_LOCATION.lng), "png");
  }
  
}
