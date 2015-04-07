import java.awt.Frame;
import controlP5.*;

ControlP5 cp5;
Button b1;
Button b2;

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
        b1 = cp5.addButton("PLAY")
           .setValue(0)
           .setPosition(100,10)
           .setSize(100,20)
           ;
           
        b2 = cp5.addButton("RESTART")
           .setValue(0)
           .setPosition(100,35)
           .setSize(100,20)
           ;
           
    }

    public void draw() {
      if(f != null)
      {
        f.setTitle("Controls");
      }  
    }
    
    public void controlEvent(ControlEvent theEvent) {
      
      if( frameCount < 40 ){ return; }

      String name = theEvent.getController().getName();
      if( name == "PLAY" )
      {
        if( !stepThrough )
        {
          stepThrough = true;
          theEvent.getController().setCaptionLabel("STOP");
        }
        else
        {
          stepThrough = false;
          theEvent.getController().setCaptionLabel("START");
        }
      }
      else if (name == "RESTART")
      {
        currentTime = startTime;
      }
    }
}
