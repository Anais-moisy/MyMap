import java.awt.Frame;
import controlP5.*;

ControlP5 cp5;

public class PFrame extends Frame {
    public PFrame() {
        setBounds(0,SKETCH_HEIGHT+50,400,100);
        controls = new ControlApplet();
        add(controls);
        controls.init();
        show();
    }
}

public class ControlApplet extends PApplet {
    public void setup() {
        size(400, 100);
        background(0);
        noLoop();
        
        cp5 = new ControlP5(this);
        // create a new button with name 'buttonA'
        Button b = cp5.addButton("Begin Visualisation")
           .setValue(0)
           .setPosition(100,10)
           .setSize(100,19)
           ;
           
        b.captionLabel().setText("PLAY");
    }

    public void draw() {
      if(f != null)
      {
        f.setTitle("Controls");
      }  
    }
    
    public void controlEvent(ControlEvent theEvent) {
      String name = theEvent.getController().getName();
      if( name == "PLAY" )
      {
        // if playing == false --> can play vis
        // else --> stop vis
      }
    }
}
