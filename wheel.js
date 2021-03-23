// basic hellow worls of phaser
// creating basic sceleton for game->gameloop

let reward = [
  "CB BOOKS",
  "CB TSHIRTS",
  "2 EXTRA SPINS",
  "AMAZON VOUCHERS",
  "50% OFF",
  "NETFLIX SUBS",
  "100% OFF",
  "CB SWAGS",
  "70% OFF",
  "HARD LUCK",
  "300 CB CREDITS",
];

let config = {
  type: Phaser.Canvas,
  width: 800,
  height: 600,
  backgroundColor: "#0E6251",
  scene: {
    preload: myLoad,
    create: myCreate,
    update: myUpdate,
  },
};

let game = new Phaser.Game(config);
function myLoad() {
  this.load.image("background", "back.jpeg");
  this.load.image("pin", "pin.png");
  this.load.image("stand", "stand.png");
  this.load.image("wheel", "wheel.png");
  this.load.image("button", "Fur Balls spin button.png");
  this.load.audio("backmusic", "mixkit-arcade-rising-231.wav");
}
function myCreate() {
  this.music = this.sound.add("backmusic");
  this.is_spining = false;
  let W = game.config.width;
  let H = game.config.height;
  let b = this.add.sprite(0, 0, "background");
  b.setPosition(W / 2, H / 2);
  this.wheel = this.add.sprite(W / 2, H / 2, "wheel");
  this.wheel.setScale(0.25);
  this.wheel.depth = 2;
  let pin = this.add.sprite(W / 2, 40, "pin");
  pin.setScale(0.3);
  pin.depth = 3;
  let stand = this.add.sprite(W / 2, H - 40, "stand");
  stand.setScale(0.3);
  this.gametext = this.add.text(10, 10, "swagat hai!!");
  // this.input.on("pointerdown", spinwheel, this);
  // button = game.add.button(10, 100, "button", actionOnClick, this, 2, 1, 0);
  this.button = this.add
    .sprite(W / 2, H / 2, "button")
    .setInteractive({ useHandCursor: true })
    .on("pointerdown", () => spinwheel());
  this.button.setScale(0.7);
  this.button.depth = 2;
  // button.inputEnabled = true;
  // button.events.onInputDown.add(actionOnClick, this);
  function actionOnClick() {
    console.log("button clicked");
  }
  spinwheel = () => {
    if (!this.is_spining) {
      this.is_spining = true;
      // this.button.depth = 0;
      spin_angle =
        Phaser.Math.Between(3, 7) * 360 + Phaser.Math.Between(0, 11) * 30;
      this.wheel.angle = 0;
      setTimeout(() => {
        this.music.play();
        tweens = this.tweens.add({
          targets: this.wheel,
          ease: "Cubic.easeOut",
          angle: spin_angle,
          duration: 6000,
          onComplete: () => {
            this.gametext.text =
              "Congratulations you won " +
              reward[(spin_angle % 360) / 30] +
              " !!";
            // this.button.depth = 2;
            setTimeout(() => {
              this.is_spining = false;
              this.music.stop();
            }, 400);
          },
        });
      }, 1000);
    } else {
      console.log("wheel is in rotation cannot start new spin");
    }
  };
}

function myUpdate() {
  if (this.is_spining) {
    this.button.depth = 0;
  } else {
    setTimeout(() => {
      this.button.depth = 3;
    }, 400);
  }
}
