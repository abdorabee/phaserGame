class SplashScreen extends Phaser.Scene {
  constructor() {
    super({ key: "SplashScreen" });
  }

  preload() {
    this.load.image(
      "gameLogo",
      "C:UsersSoftlaptopDesktop\taskGame ElementsSplash.jpg"
    );
  }

  create() {
    this.add.image(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      "gameLogo"
    );

    // Transition to loading scene after 3 seconds
    this.time.delayedCall(3000, () => {
      this.scene.start("LoadingScene");
    });
  }
}

export default SplashScreen;

class LoadingScene extends Phaser.Scene {
  constructor() {
    super({ key: "LoadingScene" });
  }

  preload() {
    let loadingText = this.add.text(
      this.cameras.main.centerX,
      this.cameras.main.centerY - 50,
      "Loading...",
      { fontSize: "32px", fill: "#fff" }
    );
    loadingText.setOrigin(0.5);

    // Create a progress bar
    let progressBar = this.add.graphics();
    this.load.on("progress", (value) => {
      progressBar.clear();
      progressBar.fillStyle(0x00ff00, 1);
      progressBar.fillRect(200, 400, 400 * value, 30);
    });

    this.load.image("seed", "Game ElementsSeed.png");
    this.load.image("plant", "Game ElementsPlant 1.png");
    this.load.image("brownSlot", "Game ElementsGround 4.png");
    this.load.audio("success", "Game ElementsSuccess.mp3");
    this.load.audio("error", "Game ElementsFail.wav");
  }

  create() {
    // Transition to the main game scene once assets are loaded
    this.scene.start("MainScene");
  }
}

class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: "MainScene" });
  }

  create() {
    // Create brown slots
    this.brownSlot = this.add.image(
      400,
      300,
      "brownSlot",
      "Game ElementsGround 4.png"
    );
    this.brownSlot.setInteractive();

    // Create draggable seed
    this.seed = this.add.image(100, 100, "seed", "Game ElementsSeed.png");
    this.seed.setInteractive();
    this.input.setDraggable(this.seed);

    // Set up drag events
    this.input.on("dragstart", (pointer, gameObject) => {
      gameObject.setAlpha(0.5);
    });

    this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });

    this.input.on("dragend", (pointer, gameObject) => {
      gameObject.setAlpha(1);
      // Check if placed correctly
      if (this.checkPlacement(gameObject)) {
        this.placeSeed(gameObject);
      } else {
        this.resetSeed(gameObject);
      }
    });
  }

  checkPlacement(seed) {
    // Define correct placement area (brown slot)
    let slotBounds = this.brownSlot.getBounds();
    return Phaser.Geom.Rectangle.Contains(slotBounds, seed.x, seed.y);
  }

  placeSeed(seed) {
    // Create a plant at the seed location and remove the seed
    this.add.image(seed.x, seed.y, "plant").setScale(0.5); // Adjust scale for the plant
    seed.destroy();

    // Play success sound
    this.load.audio("success", "Game Elements/Success.mp3");
  }

  resetSeed(seed) {
    // Return the seed to its original position
    seed.x = 100;
    seed.y = 100;

    // Play error sound
    this.sound.play("error");
  }
}

this.load.audio("drag", "Game Elements/In Game Sound.mp3");
this.load.audio("success", "Game Elements/Success.mp3");
this.load.audio("error", "Game Elements/Fail.mp3");

// Playing sound during drag
this.input.on("dragstart", (pointer, gameObject) => {
  this.sound.play("drag");
});

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [SplashScreen, LoadingScene, MainScene],
};

const game = new Phaser.Game(config);
