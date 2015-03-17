// -------- //
//  basics  //
// -------- //
int SKETCH_WIDTH = 600;
int SKETCH_HEIGHT = 400;

int SCALE_FACTOR = 1;

GLatLng START_LOCATION = new GLatLng(54.6378146,-3.5488916);

String URL_BASE = "https://maps.googleapis.com/maps/api/staticmap?";
int ZOOM_LEVEL = 14;

// -------- //
//  layout  //
// -------- //
// Central area of the sketch. May be padded to avoid tile-edge features being hard to view
// tile row size is defined by number required
int TILE_ROWS = 1;
int TILE_COLUMNS = 1;


