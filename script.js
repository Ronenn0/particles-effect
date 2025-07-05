let particles, sleepMilliSeconds, backgroundParticle;
let drawing, goingBackwards, backgroundParticleColor, particlesMovedAmountRelatively
    , colorValue, colorRgbPlace, rgb;

const msStartPoint = 40, takeThisAmount = 0.5, identical = true
        , maxAmount = 250, minSize = 2, maxSize = 25;
const offset = 60, backgroundParticleSize = 80;

function start() {
    particles = [];
    drawing = false;
    goingBackwards = false;
    // rgb = [];
    createBackgroundParticle();
}

async function draw() {
    if(!drawing) {
        return;
    }
    if(particles.length == 0) {
        goingBackwards = false;
        sleepMilliSeconds = msStartPoint;
        backgroundParticle.setSize(backgroundParticleSize);
        backgroundParticle.setPosition(-1000, -1000);
        particlesMovedAmountRelatively = 0;
        particles = [];
        colorValue = random(225);
        createRGB();
        // secondaryColorValue = random(225);
        colorRgbPlace = Math.floor(random(3));
        if(identical) {
            backgroundParticleColor = randomColor(true, 0.5);
        } else {
            backgroundParticleColor = 'rgba(0, 225, 0, 0.3)';
        }
        particlesMovedAmountRelatively = 0;
        // await sleep(2000);
    } else if(particles.length == maxAmount && !goingBackwards) {
        goingBackwards = true;
        sleepMilliSeconds = msStartPoint;
        // backgroundParticle.setPosition(-1000, -1000);
        backgroundParticle.setSize(0);
        backgroundParticle.setPosition(window.innerWidth / 2, window.innerHeight / 2);
        // backgroundParticleColor = 'rgb(255, 0, 0, 0.0003)';
    }
    
    
    if(!goingBackwards) {
        let chance = 15;
        if(Math.floor(random(chance)) == 0) {
            particles.forEach(p => {
                p.self.style.backgroundColor = randomColor(true);
            });    
        }
        let particle = new Particle(random(offset, window.innerWidth - offset), random(offset, window.innerHeight - offset), random(minSize, maxSize), true);
        particles.push(particle);
        // backgroundParticle.self.style.borderRadius = particle.self.style.borderRadius;
        // particles[particles.length - 1].self.style.boxShadow = '1px 1px rgba(0, 0, 0, 0.1)';
        // if(particles.length > 1) {
        //     particles[particles.length - 2].self.style.boxShadow = '1px 1px rgba(0, 0, 0, 0.4)';
        // }

    } else {
        const length = sleepMilliSeconds + 20;
        const animation = length + 'ms ease-in disappear';
        let last = particles[particles.length - 1 - particlesMovedAmountRelatively];
        try {
            last.self.style.animation = animation;
        } catch {
            await particles.forEach(p => {
                body.removeChild(p.self);
            });
            particles = [];
            // draw();
            // return;
        }
        removeLastParticle(last, length);
        backgroundParticle.self.style.animation = animation;
        particlesMovedAmountRelatively++;
        // await sleep(msStartPoint);
        // body.removeChild(particles[particles.length - 1].self);
        // particles.pop();
    }
    if(particles.length > 0) {
        const last = particles[particles.length - 1];

        backgroundParticle.self.style.backgroundColor = backgroundParticleColor;

        if(!goingBackwards) {
            backgroundParticle.setPosition(last.x + last.size / 2, last.y + last.size / 2);
        } else {
            backgroundParticle.setSize(backgroundParticle.size + last.size / 70);
            backgroundParticle.self.style.backgroundColor = last.self.style.backgroundColor;
        }
        // backgroundParticle.setSize(last.size * 5, last.size * sizeMultiplier);
        backgroundParticle.setBorderRadius(last.borderRadius);
    }
    if(sleepMilliSeconds > 8 + takeThisAmount) {
        sleepMilliSeconds -= takeThisAmount;
    }
    await sleep(sleepMilliSeconds);
    draw();
}

this.addEventListener('click', ()=> {
    // addParticle(e.clientX, e.clientY);
    drawing = !drawing;
    draw();
});

function addParticle(x, y) {
    // console.log(x, y);
    let particle = new Particle(x, y);
    particles.push(particle);
}

async function removeLastParticle(particle, ms) {
    await sleep(ms);
    try {
        body.removeChild(particle.self);
        particles.pop();
        particlesMovedAmountRelatively--;
    } catch { }
    
    // particle.setPosition(window.innerWidth / 2, window.innerHeight / 2);
}

function createBackgroundParticle() {
    backgroundParticle = new Particle(-1000, -1000, backgroundParticleSize, false);
    backgroundParticle.self.className = 'BackgroundParticle';
    // backgroundParticle.self.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
    body.appendChild(backgroundParticle.self);
}

function createRGB() {
    rgb = [random(225), random(225), random(225)];
}

function randomColor(addOpacity, opacity) {
    let backgroundColor = 'rgba(';
    if(identical) {
        // let rgb = [secondaryColorValue, secondaryColorValue, secondaryColorValue];
        rgb[colorRgbPlace] = colorValue;
        backgroundColor+= rgb[0] + ', ' + rgb[1] + ', ' + rgb[2];
    } else {
        backgroundColor+= random(225) + ', ' + random(225) + ', ' + random(225);
    }
    backgroundColor+= ', ' + (addOpacity ? (opacity ? opacity : random(0.2, 0.8)) : 1) + ')';
    

    // backgroundColor = 'rgba(255, 0, 0, ' + (addOpacity ? random(0.1, 0.8) : 1) + ')';

    return backgroundColor;
}
function random(a, b) {
    let min, max;
    if(!b) {
        min = 0;
        max = a;
    } else {
        min = a;
        max = b;
    }

    return min + (max - min) * Math.random();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(() => {
        resolve();
    }, ms));
}









//------------------------------------//

start();
draw();
//------------------------------------//