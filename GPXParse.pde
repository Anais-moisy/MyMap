import java.util.Calendar;
import java.io.File;

XML xml;
File gpxDir;
File gpxArray[];

void parseXML()
{
  gpxDir = new File( dataPath("") + "/gpx" );
  gpxArray = gpxDir.listFiles();
  
  println(gpxArray);
  
  xml = loadXML(gpxArray[0].getPath());
  XML[] trkpt = xml.getChild("trk").getChild("trkseg").getChildren("trkpt");
  
  for(int i=0; i<trkpt.length; i++)
  {
    Calendar cal = javax.xml.bind.DatatypeConverter.parseDateTime(trkpt[i].getChild("time").getContent());
    println(cal.getTimeInMillis());
  }
  
}

class WayPoint {
  private GLatLng position;
  private long timestamp;
  
  public WayPoint(GLatLng pos, long ts)
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
