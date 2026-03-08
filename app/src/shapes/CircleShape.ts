import { Shape } from "./Shape"

export class Circle extends Shape {
  radius: number;
  color: number;

  constructor(x: number, y: number, radius: number, color: number) {
    super(x, y);
    this.radius = radius;
    this.color = color;

    this.draw();
  }

  draw(): void {
    this.graphics.clear();
    this.graphics.circle(0, 0, this.radius);
    this.graphics.fill(this.color);
  }

  getArea(): number {
    return Math.PI * this.radius * this.radius;
  }
}