/**
 * Manages the blimp's wings.
 */
class MyWingsManager extends CGFobject {
    constructor(scene, material) {
        super(scene);
        this.material = material;

        this.init();
        this.initMovement();
    }

    init() {
        // textures
        this.blue = new CGFtexture(this.scene, "../resources/blimp/wing_texture.png");
        this.yellow = new CGFtexture(this.scene, "../resources/blimp/yellow.png");
        this.green = new CGFtexture(this.scene, "../resources/blimp/green.png");
        this.red = new CGFtexture(this.scene, "../resources/blimp/red.png");

        // objects
        this.wing = new MyWing(this.scene);
    }

    initMovement() {
        this.angle = 0;
        this.turningValue = 0;
        this.angleAddition = Math.PI/180; // smooth turning

        this.lastTime = 0;
    }

    reset() {
        this.angle = 0;
        this.turningValue = 0;
    }

    update(elapsed, turningValue) {
        this.turningValue = turningValue;

        var maxAngle = -turningValue * Math.PI/2;
        if (Math.abs(maxAngle - this.angle) < Math.PI/180) // no need to turn
            return

        var angleAddition = (maxAngle > this.angle) ? (this.angleAddition) : (-this.angleAddition); // smooth turning
        this.angle += angleAddition * elapsed / 25;
    }

    display() {
        // top
        this.material.setTexture(this.blue);
        this.material.apply();
        this.scene.pushMatrix();
        this.scene.translate(0, 0.4, -0.8);
        this.scene.rotate(this.angle, 0, 1, 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.scale(0.4, 0.4, 0.4);
        this.wing.display();
        this.scene.popMatrix();

        // down
        this.material.setTexture(this.green);
        this.material.apply();
        this.scene.pushMatrix();
        this.scene.translate(0, -0.4, -0.8);
        this.scene.rotate(this.angle, 0, 1, 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.scale(0.4, 0.4, 0.4);
        this.wing.display();
        this.scene.popMatrix();

        // left
        this.material.setTexture(this.red);
        this.material.apply();
        this.scene.pushMatrix();
        this.scene.translate(0.4, 0, -0.8);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.scale(0.4, 0.4, 0.4);
        this.wing.display();
        this.scene.popMatrix();
             
        // right
        this.material.setTexture(this.yellow);
        this.material.apply();
        this.scene.pushMatrix();
        this.scene.translate(-0.4, 0, -0.8);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.scale(0.4, 0.4, 0.4);
        this.wing.display();
        this.scene.popMatrix(); 
    }
}