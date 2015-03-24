import java.awt.Frame;

public class PFrame extends Frame {
    public PFrame() {
        setBounds(100,100,400,100);
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
    }

    public void draw() {
    }
}
