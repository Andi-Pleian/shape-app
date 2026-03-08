import { Shape } from "./Shape"

export class Star extends Shape {
  innerRadius: number;
  outerRadius: number;
  points: number;
  color: number;

  constructor(x: number, y: number, outerRadius: number ,innerRadius: number, points: number, color: number) {
    super(x, y);
    this.innerRadius = innerRadius;
    this.outerRadius = outerRadius;
    this.points = points;
    this.color = color;

    this.draw();
  }

  draw(): void {
    this.graphics.clear();
    this.graphics.star(0, 0, this.points, this.outerRadius, this.innerRadius);
    this.graphics.fill(this.color);
  }

  getArea(): number {
    return (this.points * this.innerRadius * this.outerRadius * Math.sin((2 * Math.PI) / this.points)) / 2;
  }
}