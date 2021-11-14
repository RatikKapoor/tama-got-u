class Grass {
  constructor({ x, y, images }) {
    this.x = x;
    this.y = y;
    this.images = images;

    this.image = images[Math.floor(Math.random() * images.length)];
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, 64, 64);
  }
}

export default Grass;
