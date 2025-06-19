import { makeOnePeace } from "./make-bord.js";

class Movement {
  height = 8;
  width = 3;

  newDirection = "right";
  lastDirection = "right";
  snakeLength = 1;
  previous = [];

  appleHeight = 8;
  appleWidth = 12;

  constructor() {
    this.speed();
    this.direction();
    this.spawnApple(true);
  }

  direction() {
    document.addEventListener(
      "keydown",
      function (e) {
        if (e.key === "ArrowUp" && this.lastDirection != "down") {
          this.newDirection = "up";
        }

        if (e.key === "ArrowDown" && this.lastDirection != "up") {
          this.newDirection = "down";
        }

        if (e.key === "ArrowRight" && this.lastDirection != "left") {
          this.newDirection = "right";
        }

        if (e.key === "ArrowLeft" && this.lastDirection != "right") {
          this.newDirection = "left";
        }
      }.bind(this)
    );
  }

  speed() {
    const interval = setInterval(() => {
      document.querySelector(`.loc${this.height}-${this.width}`).innerHTML = "";

      try {
        if (this.newDirection == "up") {
          this.height--;
        }

        if (this.newDirection == "down") {
          this.height++;
        }

        if (this.newDirection == "left") {
          this.width--;
        }

        if (this.newDirection == "right") {
          this.width++;
        }

        if (this.checkDead()) {
          this.dead();
          clearInterval(interval);
          return;
        }

        if (this.appleHeight === this.height && this.appleWidth === this.width) {
          this.snakeLength++;
          this.spawnApple();
        }

        this.previous.push([this.height, this.width]);
        if (this.previous.length > this.snakeLength) {
          const arr = this.previous[0];
          makeOnePeace(arr[0], arr[1]);
          this.previous.shift();
        }

        this.previous.forEach((arr) => {
          document.querySelector(`.loc${arr[0]}-${arr[1]}`).style.backgroundColor = "black";
        });

        document.querySelector(`.loc${this.height}-${this.width}`).innerHTML =
          "<div class='eyes'><div class='eye'></div><div class='eye'></div></div>";

        this.lastDirection = this.newDirection;
      } catch (error) {
        console.error(error);
      }
    }, 100);
  }

  checkDead() {
    let dead = false;
    this.previous.forEach((arr) => {
      if (arr[0] == this.height && arr[1] == this.width) {
        dead = true;
      }
    });

    if (this.width < 1 || this.width > 17) return true;

    if (this.height < 1 || this.height > 15) return true;
    return dead;
  }

  dead() {
    this.previous.forEach((arr) => {
      document.querySelector(`.loc${arr[0]}-${arr[1]}`).style.backgroundColor = "red";
    });
    setTimeout(() => {
      this.reset();
    }, 2000);
  }

  reset() {
    this.previous.forEach((arr) => {
      makeOnePeace(arr[0], arr[1]);
    });
    makeOnePeace(this.appleHeight, this.appleWidth);

    first = true;
    this.height = 8;
    this.width = 3;
    this.up = false;
    this.down = false;
    this.right = true;
    this.left = false;
    this.snakeLength = 1;
    this.previous = [];
    this.appleHeight = 8;
    this.appleWidth = 12;

    document.querySelector(".loc8-4").style.backgroundColor = "black";
    document.querySelector(".loc8-12").style.backgroundColor = "red";
  }

  spawnApple(start) {
    if (start) return;

    let wrongPlace = true;

    while (wrongPlace) {
      this.appleHeight = Math.floor(Math.random() * 15) + 1;
      this.appleWidth = Math.floor(Math.random() * 17) + 1;
      for (const arr of this.previous) {
        console.log("checking");
        if (this.appleHeight === arr[0] && this.appleWidth === arr[1]) {
          wrongPlace = true;
          break;
        }
        wrongPlace = false;
      }
    }

    document.querySelector(`.loc${this.appleHeight}-${this.appleWidth}`).style.backgroundColor = "red";
  }
}

let first = true;
document.querySelector(".loc8-4").style.backgroundColor = "black";
document.querySelector(".loc8-12").style.backgroundColor = "red";

document.addEventListener("keydown", function () {
  if (first) {
    new Movement();
  }
  first = false;
});
