const collisions = (sketch) => {
	let backgroundColor = 253;
	let width;
	let height;
	let maxMass;
	let minMass;
	let particles = [];
	let numberOfParticles = 20;

	sketch.setup = () => {
		width = 740;
		height = 600;
		myCanvas = sketch.createCanvas(width, height);
		myCanvas.parent("p5-collisions");
		sketch.colorMode(sketch.RGB, 255);
		sketch.fill(backgroundColor);
		sketch.colorMode(sketch.HSB, 360, 100, 100);

		maxMass = 150;
		minMass = 70;
		maxVelocity = 30;
		for (let i = 0; i < numberOfParticles; i++) {
			let position = new Vector(sketch.random(0.0, width), sketch.random(0.0, height));
			let velocity = new Vector(sketch.random(-maxVelocity, maxVelocity), sketch.random(-maxVelocity, maxVelocity));
			//var velocity = new Vector(0,0);
			let mass = sketch.random(minMass, maxMass);
			let particle = new Particle(position, velocity, mass);
			let intersection = true;
			while (intersection) {
				intersection = false;
				for (let j = 0; j < i; j++) {
					if (particles[j].intersect(particle)) {
						intersection = true;
						position = new Vector(sketch.random(0.0, width), sketch.random(0.0, height));
						particle = new Particle(position, velocity, mass);
						break;
					}
				}
			}
			particles.push(particle);
		}
	};

	sketch.draw = () => {
		sketch.colorMode(sketch.RGB, 255);
		sketch.fill(backgroundColor);
		sketch.background(backgroundColor)
		sketch.colorMode(sketch.HSB, 360, 100, 100);

		let delta = 0.1;
		for (let i = 0; i < particles.length; i++) {
			particles[i].computeVelocity(particles, width, height);
		}

		for (let i = 0; i < particles.length; i++) {
			particles[i].updateVelocity();
		}

		for (let i = 0; i < particles.length; i++) {
			particles[i].move(delta);
		}

		for (let i = 0; i < particles.length; i++) {
			particles[i].show(sketch);
		}
	};
};

let collisionsP5 = new p5(collisions, document.getElementById('p5-collisions'));