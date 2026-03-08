import { Shape } from "../shapes/Shape"
import { Circle } from "../shapes/CircleShape"
import { Polygon } from "../shapes/PolygonShape";
import { Star } from "../shapes/StarShape";

export class ShapeFactory {
  static createRandomShape(width: number): Shape {
    const x = Math.random() * width;
    const y = -50;

    const color = Math.random() * 0xffffff;

    const type = Math.floor(Math.random() * 3);

    if (type === 0) { // circle
      const radius = 20 + Math.random() * 20;
      return new Circle(x, y, radius, color);
    }

    if (type === 1) { // polygon
      const radius = 20 + Math.random() * 20;
      const sides = 3 + Math.floor(Math.random() * 5);
      return new Polygon(x, y, radius, sides, color);
    }

    // star
    const outerRadius = 20+ Math.random() * 20;
    const innerRadius = outerRadius * 0.5;
    const points = 5 + Math.floor(Math.random() * 3);

    return new Star(x, y, outerRadius, innerRadius, points, color);
  }
}