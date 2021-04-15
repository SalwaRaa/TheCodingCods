const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particleArray = [];


// get mouse mouse position //
let mouse = {
    x: null,
    y: null,
    radius: 80
}
window.addEventListener('mousemove',
    function (event) {
        mouse.x = event.x + canvas.clientLeft / 2;
        mouse.y = event.y + canvas.clientTop / 2;
    });

function drawImage() {
    let imageWidth = png.width || png.naturalWidth;
    let imageHeight = png.height || png.naturalHeight;
    const data = ctx.getImageData(0, 0, imageWidth, imageHeight);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    class Particle {
        constructor(x, y, color, size) {
            this.x = x + canvas.width / 2 - png.width * 2,
                this.y = y + canvas.height / 2 - png.width * 2,
                this.color = color,
                this.size = 2,
                this.baseX = x + canvas.width / 2 - png.width * 2,
                this.baseY = y + canvas.height / 2 - png.width * 2,
                this.density = ((Math.random() * 10) + 2);
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }
        update() {
            ctx.fillStyle = this.color;
            // check mouse position/particle position - collision detection
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            let forceDirectionX = dx / distance;
            let forceDirectionY = dy / distance;
            // distance past which the force is zero
            var maxDistance = 80;
            var force = (maxDistance - distance) / maxDistance;

            // if we go below zero, set it to zero.
            if (force < 0) force = 0;

            let directionX = (forceDirectionX * force * this.density) * 0.9;
            let directionY = (forceDirectionY * force * this.density) * 0.9;

            if (distance < mouse.radius + this.size) {
                this.x -= directionX;
                this.y -= directionY;
            } else {
                if (this.x !== this.baseX) {
                    let dx = this.x - this.baseX;
                    let dy = this.y - this.baseY;
                    this.x -= dx / 5;
                } if (this.y !== this.baseY) {
                    let dx = this.x - this.baseX;
                    let dy = this.y - this.baseY;
                    this.y -= dy / 5;
                }
            }
            this.draw();
        }
    }
    function init() {
        particleArray = [];

        for (var y = 0, y2 = data.height; y < y2; y++) {
            for (var x = 0, x2 = data.width; x < x2; x++) {
                if (data.data[(y * 4 * data.width) + (x * 4) + 3] > 128) {
                    let positionX = x;
                    let positionY = y;
                    let color = "rgb(" + data.data[(y * 4 * data.width) + (x * 4)] + "," + data.data[(y * 4 * data.width) + (x * 4) + 1] + "," + data.data[(y * 4 * data.width) + (x * 4) + 2] + ")";

                    particleArray.push(new Particle(positionX * 4, positionY * 4, color));

                }
            }
        }

    }
    function animate() {
        requestAnimationFrame(animate);
        ctx.fillStyle = 'rgba(255,255,255,.2)';
        ctx.fillRect(0, 0, innerWidth, innerHeight);
        // ctx.clearRect(0,0,innerWidth,innerHeight);


        for (let i = 0; i < particleArray.length; i++) {
            particleArray[i].update();
        }
    }
    init();
    animate();

    // RESIZE SETTING - empty and refill particle array every time window changes size + change canvas size
    window.addEventListener('resize',
        function () {
            canvas.width = innerWidth;
            canvas.height = innerHeight;
            init();
        });
}


var png = new Image();
png.src = "data:image/png;base64,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"
// Run drawImage after page has been fully loaded
window.addEventListener('load', (event) => {
    console.log('page has loaded');
    ctx.drawImage(png, 0, 0);
    drawImage();
});



