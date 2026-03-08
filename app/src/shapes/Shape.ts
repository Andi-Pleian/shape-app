import * as PIXI from "pixi.js"

export abstract class Shape {
  graphics: PIXI.Graphics;
  velocityY: number;

  constructor(x: number, y: number) {
    this.graphics = new PIXI.Graphics();
    this.graphics.x = x;
    this.graphics.y = y;

    this.velocityY = 0;
  }

  abstract draw(): void;
  abstract getArea(): number;

  update(delta: number, gravity: number): void {
    this.velocityY += gravity * delta;
    this.graphics.y += this.velocityY * delta;
  }

  getDisplayObject(): PIXI.Graphics {
    return this.graphics;
  }

  getY(): number {
    return this.graphics.y;
  }
}