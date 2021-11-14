class Pet {
  constructor({ x, y, images }) {
    this.x = x;
    this.y = y;
    this.images = images;

    this.mood = "neutral";
    this.walkAnimTimer = 0;

    this.image = this.moodImages().still[0];
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, 64, 64);
  }

  move(dx, dy) {
    this.x += dx;
    this.y += dy;
  }

  walk(direction = "right") {
    const walkFrames = 20;
    const walkImgs = direction === "right" ? this.moodImages().walkRight : this.moodImages().walkLeft;

    this.image = walkImgs[Math.floor(this.walkAnimTimer / walkFrames) % walkImgs.length];

    this.move(3, 0);
    this.walkAnimTimer++;
  }

  // Stand still
  stand() {
    this.image = this.moodImages().still[0];
    this.walkAnimTimer = 0;
  }

  moodImages() {
    return this.images[this.mood];
  }
}

export default Pet;
