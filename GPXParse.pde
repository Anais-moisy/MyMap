import java.util.Calendar;
import java.io.File;
import java.util.Arrays;
import java.util.Collections;
import java.lang.Comparable;

XML xml;
File gpxDir;
File gpxArray[];

void parseXML()
{
  gpxDir = new File( dataPath("") + "/gpx" );
  gpxArray = gpxDir.listFiles();
  
  waypoints = new WayPoint[gpxArray.length][];
  waypoints_list = (ArrayList<WayPoint>[])new ArrayList[waypoints.length];
  
  for(int i=0; i<gpxArray.length; i++)
  {
    // load the data, find out how man points it has and allocate array space
    println(gpxArray[i].getPath());
    xml = loadXML(gpxArray[i].getPath());
    XML[] trkpt = xml.getChild("trk").getChild("trkseg").getChildren("trkpt");
    waypoints[i] = new WayPoint[trkpt.length];
    
    for(int j=0; j<trkpt.length; j++)
    {
      // timestamp from gpx trkpt
      Calendar cal = javax.xml.bind.DatatypeConverter.parseDateTime(trkpt[j].getChild("time").getContent());
      int timestamp = int(cal.getTimeInMillis()/1000);
      
      // position from gpx trkpt
      GLatLng latlng = new GLatLng( trkpt[j].getFloat("lat"), trkpt[j].getFloat("lon") );
      waypoints[i][j] = new WayPoint(latlng, timestamp, "");
      if( j == 0 )
      {
        updateStartTime( timestamp );
      }
      
    }
    
    waypoints_list[i] = new ArrayList<WayPoint>(Arrays.asList(waypoints[i]));
    println(waypoints_list[i].get(0).getTimestamp());
    println(waypoints_list[i].get(100).getTimestamp());
  }
  currentTime = startTime;
}

public class WayPoint implements Comparable {
  private GLatLng position;
  private int timestamp;
  private String routeName;
  
  public WayPoint(GLatLng pos, int ts, String name )
  {
    this.position = pos;
    this.timestamp = ts;
  }
  
  public GLatLng getPos()
  {
    return this.position;
  }
  
  public int getTimestamp()
  {
    return this.timestamp;
  }
  
  @Override
  public int compareTo(Object compareWP)
  {
    int compareTime= ((WayPoint)compareWP).getTimestamp();
    /* For Ascending order*/
    return this.timestamp-compareTime;
  }
 
}
