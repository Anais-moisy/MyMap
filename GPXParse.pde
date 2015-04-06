import java.util.Calendar;
import java.io.File;

XML xml;
File gpxDir;
File gpxArray[];

void parseXML()
{
  gpxDir = new File( dataPath("") + "/gpx" );
  gpxArray = gpxDir.listFiles();
  
  waypoints = new WayPoint[gpxArray.length][];
//  println(gpxArray);
  
  for(int i=0; i<gpxArray.length; i++)
  {
    // load the data, find out how man points it has and allocate array space
    xml = loadXML(gpxArray[i].getPath());
    XML[] trkpt = xml.getChild("trk").getChild("trkseg").getChildren("trkpt");
    waypoints[i] = new WayPoint[trkpt.length];
    
    for(int j=0; j<trkpt.length; j++)
    {
      // timestamp from gpx trkpt
      Calendar cal = javax.xml.bind.DatatypeConverter.parseDateTime(trkpt[i].getChild("time").getContent());
      
      // position from gpx trkpt
      GLatLng latlng = new GLatLng( trkpt[i].getFloat("lat"), trkpt[i].getFloat("lon") );
      waypoints[i][j] = new WayPoint(latlng, cal.getTimeInMillis(), "");
    }
    
//    println(waypoints[i].length);
  }
  
  

  
}

class WayPoint {
  private GLatLng position;
  private long timestamp;
  private String routeName;
  
  public WayPoint(GLatLng pos, long ts, String name )
  {
    this.position = pos;
    this.timestamp = ts;
  }
  
  public GLatLng getPos()
  {
    return this.position;
  }
  
  public long getTimestamp()
  {
    return this.timestamp;
  }
 
}
