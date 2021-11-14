class Plant {
  constructor({ x, y, images }) {
    this.x = x;
    this.y = y;
    this.images = images;

    this.image = images.stem[0];
    this.growth = 0;
  }

  grow() {
    if (this.growth < 2) {
      this.growth++;
    }

    if (this.growth === 0) {
      this.image = this.images.stem[0];
    } else if (this.growth === 1) {
      this.image = this.images.stem[1];
    } else if (this.growth === 2) {
      this.image =
        this.images.flower[
          Math.floor(Math.random() * this.images.flower.length)
        ];
    }
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, 64, 64);
  }
}

export default Plant;
