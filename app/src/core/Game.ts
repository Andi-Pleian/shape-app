import { Application, Container, FederatedPointerEvent } from "pixi.js"
import { ShapeManager } from "../managers/ShapeManager"

export class Game {
  app: Application;
  stage: Container;
  shapeManager!: ShapeManager;
  
  width: number = 800;
  height: number = 600;

  spawnRate = 1;
  spawnTimer: any;
  gravity = 0.2;

  constructor() {
    this.app = new Application();
    this.stage = new Container();
  }

  async init(): Promise<void> {
    await this.app.init({
      width: this.width,
      height: this.height,
      background: "#ffffff",
    });

    document.getElementById("canvas-container")?.appendChild(this.app.canvas);
    this.app.stage.addChild(this.stage);
    this.shapeManager = new ShapeManager(this.stage, this.height, this.width);

    this.app.stage.eventMode = "static";
    this.app.stage.hitArea = this.app.screen;
    this.app.stage.on("pointerdown", this.onCanvasClick);

    this.startGameLoop();
    this.startSpawning();
    this.setupUI();
  }

  startGameLoop(): void {
    this.app.ticker.add((ticker) => {
      this.shapeManager.update(ticker.deltaTime);
      this.updateStats();
    });
  }

  startSpawning(): void {
    clearInterval(this.spawnTimer);

    const interval = 1000 / this.spawnRate;

    this.spawnTimer = setInterval(() => {
      this.shapeManager.spawnShape();
    }, interval);
  }

  onCanvasClick = (event: FederatedPointerEvent) => {
    if (event.target !== this.app.stage) {
      return;
    }
    
    const position = event.global;
    this.shapeManager.spawnShapeAt(position.x, position.y);
  }

  setupUI(): void {
    const spawnPlus = document.getElementById("spawnPlus")!;
    const spawnMinus = document.getElementById("spawnMinus")!;

    const gravityPlus = document.getElementById("gravityPlus")!;
    const gravityMinus = document.getElementById("gravityMinus")!;

    spawnPlus.addEventListener("click", () => {
      this.spawnRate++;
      this.startSpawning();
    });

    spawnMinus.addEventListener("click", () => {
      this.spawnRate--;
      this.startSpawning();
    });

    gravityPlus.addEventListener("click", () => {
      this.gravity += 0.1;
      this.shapeManager.gravity = this.gravity;
    });

    gravityMinus.addEventListener("click", () => {
      this.gravity -= 0.1;

      if (this.gravity < 0) {
        this.gravity = 0;
      }

      this.shapeManager.gravity = this.gravity;
    });
  }

  updateStats(): void {
    const shapesCounter = document.getElementById("shapeCount")!;
    const totalArea = document.getElementById("totalArea")!;

    shapesCounter.textContent = this.shapeManager.getShapeCount().toString();
    totalArea.textContent = this.shapeManager.getTotalArea().toFixed(0);
  }
}