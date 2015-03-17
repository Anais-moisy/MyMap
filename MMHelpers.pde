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
  url += "&scale=1&format=png32.png";
  
  return url;
}

void createMaskTiles()
{
  maskTiles = new PImage[mapTiles.length];
  
  for(int i=0; i<mapTiles.length; i++)
  {
    maskTiles[i] = createImage(getTileSize().width, getTileSize().height, ARGB);
    maskTiles[i].loadPixels();
    for (int x = 0; x < maskTiles[i].pixels.length; x++) {
      maskTiles[i].pixels[x] = color(190, 190, 190, 225); 
    }
    maskTiles[i].updatePixels();
  }
}
