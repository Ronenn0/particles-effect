const body = document.querySelector('body');

class Particle {
    constructor(x, y, size, addColor) {
        this.createParticle(x, y, size, addColor);
        // this.addClickEvent();
    }
    createParticle(x, y, size, addColor) {
        this.self = document.createElement('div');
        this.self.className = 'Particle';
        this.borderRadius = random(50 + 10) + '%';
        this.self.style.borderRadius = this.borderRadius;
        if(addColor) {
            this.self.style.backgroundColor = randomColor(true);
        }
        // body.style.backgroundColor = backgroundColor;
        this.setSize(size);
        this.setPosition(x, y);
        body.appendChild(this.self);
        // console.log(this);
    }
    addClickEvent() {
        this.self.addEventListener('click', ()=> {
            body.style.backgroundColor = this.self.style.backgroundColor;
            console.log(this.self.style.backgroundColor);
        });
    }
    setPosition(x, y) {
        this.x = x;
        this.y = y;
        this.self.style.left = x + 'px';
        this.self.style.top = y + 'px';
    }
    setSize(size) {
        this.size = size;
        this.self.style.width = size + 'px';
        this.self.style.height = size + 'px';
    }
    setBorderRadius(radius) {
        this.borderRadius = radius;
        this.self.style.borderRadius = radius;
    }

}