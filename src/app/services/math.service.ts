import { Injectable } from "@angular/core";
import { Circle } from "../models/circle";
import { ImageForCanvas } from "../models/imageForCanvas";
import { FilledRectangle } from "../models/filledRectangle";

@Injectable({
    providedIn: 'root',
})

export class MathService {

    heroMovementSpeed = 0;

    static getRandomInteger(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min +1)) + min;
    }

    isTwoCirclesToClose(circle1: Circle, circle2: Circle): boolean {
        return Math
            .sqrt
            (Math.pow(circle1.point.width - circle2.point.width, 2)
                + Math.pow(circle1.point.height - circle2.point.height, 2)) < circle1.radius + circle2.radius
    }

    isCircleAndImageToClose(circle: Circle, img: ImageForCanvas): boolean {
        return Math
            .sqrt
            (Math.pow(circle.point.width - img.point.width, 2)
                + Math.pow(circle.point.height - img.point.height, 2)) < circle.radius + img.width / 2;
    }

    isCircleAndRectangleToClose(circle: Circle, rectangle: FilledRectangle): boolean {
        var distX = Math.abs(circle.point.width - rectangle.point.width);
        var distY = Math.abs(circle.point.height - rectangle.point.height);

        if (distX > (rectangle.width / 2 + circle.radius)) { return false; }
        if (distY > (rectangle.height / 2 + circle.radius)) { return false; }
        return true;
    }

    isImageAndRectangleToClose(image: ImageForCanvas, rectangle: FilledRectangle): boolean {
        var distX = Math.abs(image.point.width - rectangle.point.width);
        var distY = Math.abs(image.point.height - rectangle.point.height);

        if (distX > (rectangle.width / 2 + image.width / 2)) { return false; }
        if (distY > (rectangle.height / 2 + image.height / 2)) { return false; }
        return true;
    }

    isTwoImagesToClose(image1: ImageForCanvas, image2: ImageForCanvas): boolean {
        var distX = Math.abs(image1.point.width - image2.point.width);
        var distY = Math.abs(image1.point.height - image2.point.height);

        if (distX > (image1.width / 2 + image2.width / 2)) { return false; }
        if (distY > (image1.height / 2 + image2.height / 2)) { return false; }
        return true;
    }

    isCircleAndRectangleTangleFromLeftRectangleSide(circle: Circle, rectangle: FilledRectangle): boolean {
      return Math.floor(rectangle.startPoint.width) === Math.floor(circle.point.width + circle.radius)
      && Math.abs(rectangle.point.height - circle.point.height) < rectangle.height / 2 + circle.radius
    }

    isImageAndRectangleTangleFromLeftRectangleSide(image: ImageForCanvas, rectangle: FilledRectangle): boolean {
        return Math.abs(Math.floor(rectangle.startPoint.width) - Math.floor(image.point.width + image.width / 2)) <= this.heroMovementSpeed
        && Math.abs(rectangle.point.height - image.point.height) < rectangle.height / 2 + image.width / 2
      }

    isCircleAndRectangleTangleFromRightRectangleSide(circle: Circle, rectangle: FilledRectangle): boolean {
        return Math.floor(rectangle.startPoint.width + rectangle.width) === Math.floor(circle.point.width - circle.radius)
        && Math.abs(rectangle.point.height - circle.point.height) < rectangle.height / 2 + circle.radius 
    }

    isImageAndRectangleTangleFromRightRectangleSide(image: ImageForCanvas, rectangle: FilledRectangle): boolean {
        return Math.abs(Math.floor(rectangle.startPoint.width + rectangle.width) - Math.floor(image.point.width - image.width / 2)) <= this.heroMovementSpeed
        && Math.abs(rectangle.point.height - image.point.height) < rectangle.height / 2 + image.width / 2 
    }

    isCircleAndRectangleTangleFromTopSide(circle: Circle, rectangle: FilledRectangle): boolean {
        return Math.floor(rectangle.startPoint.height) === Math.floor(circle.point.height + circle.radius)
        && Math.abs(rectangle.point.width - circle.point.width) <= rectangle.width / 2 + circle.radius;
    }

    isImageAndRectangleTangleFromTopSide(image: ImageForCanvas, rectangle: FilledRectangle): boolean {
        return Math.abs(Math.floor(rectangle.startPoint.height) - Math.floor(image.point.height + image.height / 2)) <= this.heroMovementSpeed
        && Math.abs(rectangle.point.width - image.point.width) <= rectangle.width / 2 + image.width / 2;
    }

    isAllImageAndRectangleTangleFromTopSide(image: ImageForCanvas, rectangle: FilledRectangle): boolean {
        return Math.floor(rectangle.startPoint.height) === Math.floor(image.point.height + image.height / 2)
        && Math.abs(rectangle.point.width - image.point.width) <= rectangle.width / 2;
    }

    isCircleAndRectangleTangleFromDownSide(circle: Circle, rectangle: FilledRectangle): boolean {
        return Math.floor(rectangle.startPoint.height + rectangle.height) === Math.floor(circle.point.height - circle.radius)
        && Math.abs(rectangle.point.width - circle.point.width) <= rectangle.width / 2 + circle.radius;
    }

    isImageAndRectangleTangleFromDownSide(image: ImageForCanvas, rectangle: FilledRectangle): boolean {
        return Math.abs(Math.floor(rectangle.startPoint.height + rectangle.height) - Math.floor(image.point.height - image.width / 2)) <= this.heroMovementSpeed
        && Math.abs(rectangle.point.width - image.point.width) <= rectangle.width / 2 + image.width / 2;
    }
}
