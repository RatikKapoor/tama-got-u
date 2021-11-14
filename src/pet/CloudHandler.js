class Cloud {
  constructor(x, y, image, big = false) {
    this.x = x;
    this.y = y;
    this.image = image;
    this.big = big;
  }

  draw(ctx) {
    if (this.big) {
      ctx.drawImage(this.image, this.x, this.y, 512, 128);
    } else {
      ctx.drawImage(this.image, this.x, this.y, 512, 128);
    }
  }
}

class CloudHandler {
  constructor({ images }) {
    this.images = images;

    this.clouds = [];
    this.buildClouds();
  }

  buildClouds() {
    let numClouds = Math.floor(Math.random() * 4) + 3;
    for (let i = 0; i < numClouds; i++) {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * 250;
      const randImg = this.images.small[Math.floor(Math.random() * this.images.small.length)];
      this.clouds.push(new Cloud(x, y, randImg, false));
    }

    numClouds = Math.floor(Math.random() * 1) + 1;
    for (let i = 0; i < numClouds; i++) {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * 250;
      const randImg = this.images.big[Math.floor(Math.random() * this.images.big.length)];
      this.clouds.push(new Cloud(x, y, randImg, false));
    }
  }

  update() {
    this.clouds.forEach((c) => {
      if (c.x > window.innerWidth) {
        c.x = -200;
      }

      c.x++;
    });
  }

  draw(ctx) {
    this.clouds.forEach((c) => {
      c.draw(ctx);
    });
  }
}

export default CloudHandler;
