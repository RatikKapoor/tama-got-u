class Pet {
  constructor({ x, y, images }) {
    this.x = x;
    this.y = y;
    this.images = images;

    this.happiness = 0;
    this.mood = "neutral";
    this.walkAnimTimer = 0;

    this.spawnPoint = { x, y };

    this.walkAnimTimer = 0;
    this.walkFrames = 16;

    // Actions to run in background
    this.actions = {
      idle: {
        action: "idle",
        timer: 0,
        min: 30,
        max: 300,
        currentMax: 100,
        nextActions() {
          return this.listNextActions(["walk"], [], ["hop"]);
        },
      },
      walk: {
        action: "walk",
        timer: 0,
        min: 30,
        max: 100,
        currentMax: 60,
        nextActions() {
          return this.listNextActions(["idle"], [], ["hop"]);
        },
        currentData: {
          direction: 1,
        },
        onInit(actionData) {
          this.randomWalk(actionData);
        },
      },
      hop: {
        action: "hop",
        timer: 0,
        min: 30,
        max: 100,
        nextActions: ["walk", "idle"],
        currentData: {
          direction: 1,
        },
        onInit(actionData) {
          this.ySpeed = -5;
          this.gravity = 0.4;
          this.originalY = this.y;
          this.randomWalk(actionData);
        },
        onComplete(actionData) {
          this.y = this.originalY;
        },
      },
    };
    this.currentAction = this.actions.idle;

    this.activeAction = null; // Actions that are directly in response to user interaction

    this.image = this.moodImages().still[0];
  }

  listNextActions(neutralList, happyList = [], excitedList = []) {
    let nextActionNames = neutralList;
    if (this.mood === "happy" || this.mood === "excited") {
      nextActionNames = nextActionNames.concat(happyList);
    }

    if (this.mood === "excited") {
      nextActionNames = nextActionNames.concat(excitedList);
    }

    return nextActionNames[Math.floor(Math.random() * nextActionNames.length)];
  }

  randomWalk(actionData) {
    const distToCenter = this.x - window.innerWidth / 2;
    const maxWanderDist = window.innerWidth * 0.3;
    const rand = Math.random() * 2 - 1; // Random num from -1 to 1
    const weightCurve = Math.pow(distToCenter / maxWanderDist, 3);
    actionData.currentData.direction = rand >= weightCurve ? 1 : -1;
  }

  update() {
    if (this.activeAction) {
      this.runAction(this.activeAction);
    } else {
      this.runAction(this.currentAction);
    }
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, 64, 64);
  }

  initActiveAction(actionData, { currentMax, onInit = null }) {
    this.initAction(actionData);

    actionData.currentMax = currentMax;
    this.activeAction = actionData;

    if (onInit) {
      onInit.call(this, actionData);
    }
  }

  initBackgroundAction(actionData) {
    this.initAction(actionData);

    const timeRange = actionData.max - actionData.min;
    actionData.currentMax = Math.random() * timeRange + actionData.min;
  }

  // Helper function for initiating action
  initAction(actionData) {
    actionData.timer = 0;
    this.currentAction = actionData;

    if (actionData.hasOwnProperty("onInit")) {
      actionData.onInit.call(this, actionData);
    }
  }

  // Run actions when the user is idle
  runAction(actionData) {
    switch (actionData.action) {
      case "idle":
        this.idle();
        break;
      case "walk":
        this.walk(actionData.currentData.direction);
        break;
      case "hop":
        this.hop(actionData.currentData.direction);
        break;
      default:
        console.warn("Pet hit illegal state", actionData?.action);
        this.initBackgroundAction(this.actions.idle);
    }

    this.updateAction(actionData);
  }

  updateAction(actionData) {
    if (actionData.timer >= actionData.currentMax) {
      this.endAction(actionData);
      this.triggerNextAction(actionData);
    }

    actionData.timer++;
  }

  endAction(actionData) {
    this.activeAction = null;

    if (actionData.hasOwnProperty("onComplete")) {
      actionData.onComplete.call(this, actionData);
    }
  }

  triggerNextAction(actionData) {
    let nextActionName = "";
    if (typeof actionData.nextActions === "function") {
      nextActionName = actionData.nextActions.call(this, actionData);
    } else {
      nextActionName = actionData.nextActions[Math.floor(Math.random() * actionData.nextActions.length)];
    }
    this.initBackgroundAction(this.actions[nextActionName]);
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

  hop(direction) {
    let walkDirection = 0;
    if (direction > 0) walkDirection = 3;
    if (direction < 0) walkDirection = -3;

    this.ySpeed += this.gravity;
    if (this.y >= this.originalY) {
      this.y = this.originalY;
      this.ySpeed = -5;
    }

    this.move(walkDirection, this.ySpeed);
  }

  // Stand still
  idle() {
    this.image = this.moodImages().still[0];
  }

  moodImages() {
    const mood = this.mood === "excited" ? "happy" : this.mood;
    return this.images[mood];
  }

  setHappiness(happiness) {
    this.happiness = happiness;

    if (this.happiness >= 4) {
      this.mood = "excited";
    } else if (this.happiness >= 2) {
      this.mood = "happy";
    } else {
      this.mood = "neutral";
    }
  }

  setActiveAction(actionName) {
    if (this.activeAction) {
      this.endAction(this.activeAction);
    }
    if (this.currentAction) {
      this.endAction(this.currentAction);
    }

    switch (actionName) {
      case "hop":
        this.initActiveAction(this.actions.hop, {
          currentMax: 30,
          onInit(actionData) {
            actionData.currentData.direction = 0;
          },
        });
        break;
      default:
        console.warn("Illegal action name provided in setActiveAction");
        this.initBackgroundAction(this.actions.idle);
    }
  }
}

export default Pet;
