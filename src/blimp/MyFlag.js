/**
* MyFlag
* @constructor
*/
class MyFlag extends CGFobject {
    constructor(scene, divs = 100) {
        super(scene);
        this.divs = divs;

        this.flagTex = new CGFtexture(this.scene, "../resources/textures/supply/pig/pig_f.png");
        this.material = new CGFappearance(this.scene);
        this.material.setTexture(this.flagTex);
        this.material.setTextureWrap('REPEAT', 'REPEAT');

        this.plane = new MyPlane(scene, this.divs, true);

        this.shader = new CGFshader(this.scene.gl, "shaders/flag.vert", "shaders/flag.frag");

        // The first sampler is the texture and the second is the map
        this.shader.setUniformsValues({ uSampler: 1 });
        this.shader.setUniformsValues({ timeFactor: 0 });

        this.initMovement();

        this.factor = 0;
    }

    initMovement() {
        this.anglePerSecond = Math.PI / 8; // in rads
        this.angle = 0;
        this.turningValue = 0;
    }

    update(t, turningValue, speed, angle) {
        this.factor += (t % (2 * Math.PI));
        this.shader.setUniformsValues({ timeFactor: this.factor * 5,
            speed: speed,
            angle: angle * 10});

        if (Math.abs(speed) < 0.25) return;

        this.turningValue = turningValue;

        var maxAngle = -turningValue * Math.PI / 2;
        if (Math.abs(maxAngle - this.angle) < Math.PI / 180) // no need to turn
            return

        var angleAddition = (maxAngle > this.angle) ? (this.anglePerSecond) : (-this.anglePerSecond); // smooth turning
        this.angle += t * angleAddition;
    }

    display() {
        this.scene.setActiveShader(this.shader);

        this.material.apply();

        this.scene.pushMatrix();

        this.flagTex.bind(1);

        this.scene.scale(1.5, 0.75, 1);
        this.scene.translate(-0.5, 0, 0);
        this.scene.rotate(this.angle, 0, 1, 0);
        this.scene.translate(0.5, 0, 0);
        this.scene.gl.frontFace(this.scene.gl.CW);
        this.plane.display();
        this.scene.gl.frontFace(this.scene.gl.CCW);
        this.plane.display();

        this.scene.popMatrix();
    }
}