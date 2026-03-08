import { Shape } from "./Shape"

export class Polygon extends Shape {
  radius: number;
  sides: number;
  color: number;

  constructor(x: number, y: number, radius: number, sides: number, color: number) {
    super(x, y);
    this.radius = radius;
    this.sides = sides;
    this.color = color;

    this.draw();
  }

  draw(): void {
    this.graphics.clear();
    this.graphics.regularPoly(0, 0, this.radius, this.sides);
    this.graphics.fill(this.color);
  }

  getArea(): number {
    return (this.sides * this.radius * this.radius * Math.sin((2 * Math.PI) / this.sides)) / 2;
  }
}