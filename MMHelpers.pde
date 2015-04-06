import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URL;

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
  int objWidth = int(SKETCH_WIDTH / 2);
  int objHeight = int(SKETCH_HEIGHT / 2);
  
  if(objWidth > 600)
  {
    objWidth = 600;
  }
  
  if(objHeight > 600)
  {
    objHeight = 600;
  }

  return new ObjSize(objWidth,objHeight);

}

String generateTileURL(GLatLng latlng)
{
  float lat = latlng.lat;
  float lng = latlng.lng;
  
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
  mapTiles = new PImage[16];
  GLatLng[] tileCentres = generateTileCenters();
  
  for(int i=0; i<mapTiles.length; i++)
  {
    String full_url = generateTileURL(tileCentres[i]);
    int filename_start = full_url.indexOf("center=")+7;
    int filename_end = full_url.indexOf("&format");
    
    String filename = full_url.substring(filename_start, filename_end) + ".png";
    
    File f = new File(dataPath("") + "/tiles/workington/" + filename);
    if (!f.exists()) {
      println("File does not exist");
      try {
        saveImage( full_url, f.getPath() );
      } catch (IOException e)
      {
        println(e);
      }
    } 
    mapTiles[i] = loadImage(generateTileURL(START_LOCATION), "png");
  }
  
}

void saveImage(String imageUrl, String destinationFile) throws IOException
{
  URL url = new URL(imageUrl);
  InputStream is = url.openStream();
  OutputStream os = new FileOutputStream(destinationFile);

  byte[] b = new byte[2048];
  int length;

  while ((length = is.read(b)) != -1) {
    os.write(b, 0, length);
  }

  is.close();
  os.close();
}

GLatLng[] generateTileCenters()
{
  FloatDict fd = getCorners(START_LOCATION, ZOOM_LEVEL, getTileSize().width, getTileSize().height);
  float lat_difference = ( START_LOCATION.lat - fd.get("S") )*2;
  float lng_difference = ( START_LOCATION.lng - fd.get("W") )*2;
  println(lat_difference);
  println(lng_difference);

  GLatLng[] centers = new GLatLng[16];
  
  for(int lat=2; lat>=-2; lat--)
 {
   for(int lng=-2; lng<=2; lng++)
   {
     centers.push(new GLatLng( START_LOCATION.lat+(lat_difference*lat), START_LOCATION.lng+(lng_difference*lng) ));
   }
 }
 
  return centers;
}
