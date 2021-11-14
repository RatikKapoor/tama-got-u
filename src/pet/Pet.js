class Pet {
  constructor({ x, y, images }) {
    this.x = x;
    this.y = y;
    this.images = images;

    this.mood = "neutral";
    this.walkAnimTimer = 0;

    this.spawnPoint = { x, y };

    this.walkAnimTimer = 0;
    this.walkFrames = 16;

    this.actions = {
      idle: {
        action: "idle",
        timer: 0,
        min: 60,
        max: 300,
        currentMax: 100,
        nextActions: ["walk"],
      },
      walk: {
        action: "walk",
        timer: 0,
        min: 30,
        max: 100,
        currentMax: 60,
        nextActions: ["idle"],
        currentData: {
          direction: 1,
        },
        onInit(actionData) {
          const distToCenter = this.x - window.innerWidth / 2;
          const maxWanderDist = window.innerWidth * 0.3;
          const rand = Math.random() * 2 - 1; // Random num from -1 to 1
          const weightCurve = Math.pow(distToCenter / maxWanderDist, 3);
          actionData.currentData.direction = rand >= weightCurve ? 1 : -1;
        },
      },
    };
    this.currentAction = this.actions.idle;

    this.image = this.moodImages().still[0];
  }

  update() {
    switch (this.currentAction.action) {
      case "idle":
        this.idle();
        break;
      case "walk":
        this.walk(this.currentAction.currentData.direction);
        break;
      default:
        console.warn("Pet hit illegal state", this.currentAction?.action);
        this.initAction(this.actions.idle);
    }

    this.updateAction(this.currentAction);
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, 64, 64);
  }

  initAction(actionData) {
    actionData.timer = 0;
    const timeRange = actionData.max - actionData.min;
    actionData.currentMax = Math.random() * timeRange + actionData.min;
    this.currentAction = actionData;

    if (actionData.hasOwnProperty("onInit")) {
      actionData.onInit.call(this, actionData);
    }
  }

  updateAction(actionData) {
    if (actionData.timer >= actionData.currentMax) {
      const nextActionName = actionData.nextActions[Math.floor(Math.random() * actionData.nextActions.length)];
      this.initAction(this.actions[nextActionName]);
    }

    actionData.timer++;
  }

  initIdleAction() {
    this.initAction(this.actions.idle);
  }

  move(dx, dy) {
    this.x += dx;
    this.y += dy;
  }

  // Direction > 0 is "right"
  // Direction < 0 is "left"
  walk(direction) {
    const walkDirection = direction > 0 ? 3 : -3;
    const walkImgs = direction > 0 ? this.moodImages().walkRight : this.moodImages().walkLeft;

    this.image = walkImgs[Math.floor(this.actions.walk.timer / this.walkFrames) % walkImgs.length];

    this.move(walkDirection, 0);
  }

  // Stand still
  idle() {
    this.image = this.moodImages().still[0];
  }

  moodImages() {
    return this.images[this.mood];
  }
}

export default Pet;
