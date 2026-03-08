import * as PIXI from "pixi.js";
import { Shape } from "../shapes/Shape";
import { ShapeFactory } from "../factories/ShapeFactory";

export class ShapeManager {
  private stage: PIXI.Container;
  private shapes: Shape[] = [];
  gravity: number = 0.2;
  screenHeight: number;
  screenWidth: number;

  constructor(stage: PIXI.Container, screenHeight: number, screenWidth: number) {
    this.stage = stage;
    this.screenHeight = screenHeight;
    this.screenWidth = screenWidth;
  }

  spawnShape(): void {
    const shape = ShapeFactory.createRandomShape(this.screenWidth);
    const graphics = shape.getDisplayObject();

    graphics.eventMode = "static";
    graphics.cursor = "pointer";

    graphics.on("pointerdown", (event: PIXI.FederatedPointerEvent) => {
      event.stopPropagation();
      this.removeShape(shape);
    });

    this.stage.addChild(graphics);

    this.shapes.push(shape);
  }

  update(delta: number): void {
    for (const shape of this.shapes) {
      shape.update(delta, this.gravity);

      if (shape.getY() > this.screenHeight + 50) {
        this.removeShape(shape);
      }
    }
  }

  removeShape(shape: Shape): void {
    const index = this.shapes.indexOf(shape);

    if (index != -1) {
      this.stage.removeChild(shape.getDisplayObject());
      this.shapes.splice(index, 1);
    }
  }

  getShapeCount(): number {
    return this.shapes.length;
  }

  getTotalArea(): number {
    let total = 0;

    for (const shape of this.shapes) {
      total += shape.getArea();
    }

    return total;
  }

  spawnShapeAt(x: number, y: number): void {
    const shape = ShapeFactory.createRandomShape(this.screenWidth);
    const graphics = shape.getDisplayObject();

    shape.graphics.x = x;
    shape.graphics.y = y;

    graphics.eventMode = "static";
    graphics.cursor = "pointer";

    graphics.on("pointerdown", (event: PIXI.FederatedPointerEvent) => {
      event.stopPropagation();
      this.removeShape(shape); // remove shape on click
    });

    this.stage.addChild(shape.graphics);
    this.shapes.push(shape);
  }
}