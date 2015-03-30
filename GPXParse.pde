XML xml;

void parseXML()
{
  xml = loadXML("1900682.gpx");
  XML[] trkpt = xml.getChild("trk").getChild("trkseg").getChildren("trkpt");
  
  for(int i=0; i<trkpt.length; i++)
  {
    println(trkpt[i]);
  }
  
}
