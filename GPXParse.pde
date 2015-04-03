import java.util.Calendar;

XML xml;

void parseXML()
{
  xml = loadXML("garmin_02042015.gpx");
  XML[] trkpt = xml.getChild("trk").getChild("trkseg").getChildren("trkpt");
  
  for(int i=0; i<trkpt.length; i++)
  {
    Calendar cal = javax.xml.bind.DatatypeConverter.parseDateTime(trkpt[i].getChild("time").getContent());
    println(cal.getTimeInMillis());
  }
  
}

// position obj
// glatlng
// timestamp


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
