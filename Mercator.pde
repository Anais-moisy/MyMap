import java.util.Map;

float MERCATOR_RANGE = 256.0f;

float bound(float value, float opt_min, float opt_max) {
  if (opt_min != 0.0f) value = Math.max(value, opt_min);
  if (opt_max != 0.0f) value = Math.min(value, opt_max);
  return value;
}

float degreesToRadians(float deg) {
  return (float)(deg * (Math.PI / 180));
}

float radiansToDegrees(float rad) {
  return (float)(rad / (Math.PI / 180));
}

class GMapPoint {
  public float x,y;
  
  public GMapPoint(float x, float y){
    this.x = x;
    this.y = y;
  }
}

class GLatLng {
  public float lat;
  public float lng;
  
  public GLatLng(float lt, float ln){
     this.lat = lt;
     this.lng = ln;
  }
}

class MercatorProjection {
  GMapPoint pixelOrigin_ = new GMapPoint( MERCATOR_RANGE / 2, MERCATOR_RANGE / 2);
  float pixelsPerLonDegree_ = MERCATOR_RANGE / 360;
  float pixelsPerLonRadian_ = MERCATOR_RANGE / (float)(2 * Math.PI);
  
  GMapPoint fromLatLngToPoint (GLatLng latLng) {
    MercatorProjection me = this;
  
    GMapPoint point = new GMapPoint(0,0);
  
    GMapPoint origin = me.pixelOrigin_;
    point.x = origin.x + latLng.lng * me.pixelsPerLonDegree_;
    // NOTE(appleton): Truncating to 0.9999 effectively limits latitude to
    // 89.189.  This is about a third of a tile past the edge of the world tile.
    float siny = bound(((float)Math.sin(degreesToRadians(latLng.lat))), -0.9999, 0.9999);
    point.y = origin.y + 0.5 * (float)(Math.log((1 + siny) / (1 - siny))) * -me.pixelsPerLonRadian_;
    return point;
  };
  
  GLatLng fromPointToLatLng(GMapPoint point) {
    MercatorProjection me = this;
  
    GMapPoint origin = me.pixelOrigin_;
    float lng = (point.x - origin.x) / me.pixelsPerLonDegree_;
    float latRadians = (point.y - origin.y) / -me.pixelsPerLonRadian_;
    float lat = radiansToDegrees((float)(2 * (Math.atan(Math.exp(latRadians))) - Math.PI / 2));
    return new GLatLng(lat, lng);
  };
  
  
};

HashMap getCorners(GLatLng center, int zoom, int mapWidth, int mapHeight){
    HashMap<String,Float> hm = new HashMap<String,Float>();
    float scale = pow(2, zoom);
    MercatorProjection proj = new MercatorProjection();
    GMapPoint centerPx = proj.fromLatLngToPoint(center);
    GMapPoint SWPoint = new GMapPoint(centerPx.x-(mapWidth/2)/scale, centerPx.y+(mapHeight/2)/scale);
    GLatLng SWLatLon = proj.fromPointToLatLng(SWPoint);
    GMapPoint NEPoint = new GMapPoint(centerPx.x+(mapWidth/2)/scale, centerPx.y-(mapHeight/2)/scale);
    GLatLng NELatLon = proj.fromPointToLatLng(NEPoint);
    hm.put("N", NELatLon.lat);
    hm.put("E", NELatLon.lng);
    hm.put("S", SWLatLon.lat);
    hm.put("W", SWLatLon.lng);
    return hm;
}
