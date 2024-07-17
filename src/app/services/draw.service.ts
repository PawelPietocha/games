import { Injectable } from "@angular/core";
import { Rectangle } from "../models/rectangle";
import { Circle } from "../models/circle";
import { FilledRectangle } from "../models/filledRectangle";
import { ImageForCanvas } from "../models/imageForCanvas";
import { RotateImageForCanvas } from "../models/rotate-image-for-canvas";
import { Point } from "../models/point";
import { KoffingOponent } from "../games/platform/models/koffing-oponent";

@Injectable({
    providedIn: 'root',
})

export class DrawService {

    drawLine(
        ctx: CanvasRenderingContext2D,
        startPoint: Point,
        endPoint: Point,
        color: string,
        lineWidth: number = 1,
    ): void {
        ctx.beginPath();
        ctx.moveTo(startPoint.width, startPoint.height);
        ctx.lineTo(endPoint.width, endPoint.height);
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = color;
        ctx.stroke();
    }

    drawRectancleContours(
        ctx: CanvasRenderingContext2D,
        rectangle: Rectangle,
        lineWidth: number = 1,
        withoutLastLine: boolean = false
    ): void {
        ctx.beginPath();
        ctx.moveTo(rectangle.pointA.width, rectangle.pointA.height);
        ctx.lineTo(rectangle.pointB.width, rectangle.pointB.height);
        ctx.lineTo(rectangle.pointC.width, rectangle.pointC.height);
        ctx.lineTo(rectangle.pointD.width, rectangle.pointD.height);

        if (!withoutLastLine) {
            ctx.lineTo(rectangle.pointA.width, rectangle.pointA.height);
        }

        ctx.strokeStyle = rectangle.color;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
    }

    drawFilledRectangle(
        ctx: CanvasRenderingContext2D,
        filledRectangle: FilledRectangle
    ) {
        ctx.fillStyle = filledRectangle.color;
        ctx.fillRect(
            filledRectangle.startPoint.width,
            filledRectangle.startPoint.height,
            filledRectangle.width,
            filledRectangle.height);
    }

    drawLinearGradientRectangle(
        ctx: CanvasRenderingContext2D,
        filledRectangle: FilledRectangle,
        gradient: CanvasGradient
    ) {
    
        ctx.fillStyle = gradient
        ctx.fillRect(
            filledRectangle.startPoint.width,
            filledRectangle.startPoint.height,
            filledRectangle.width,
            filledRectangle.height);
    }

    drawCircle(
        ctx: CanvasRenderingContext2D,
        circle: Circle,
        partOfFullCircle: number = 1,
        filled: boolean = true,
        reverseAngle: boolean = false
    ): void {
        ctx.beginPath();
        if (reverseAngle) {
            ctx.arc(circle.point.width, circle.point.height, circle.radius, (Math.PI * 2) * partOfFullCircle, 0, true);
        }
        else {
            ctx.arc(circle.point.width, circle.point.height, circle.radius, 0, (Math.PI * 2) * partOfFullCircle, true);
        }
        if (filled) {
            ctx.fillStyle = circle.color;
            ctx.fill();
        }
        else {
            ctx.strokeStyle = circle.color;
            ctx.stroke();
        }
    }

    drawImage(ctx: CanvasRenderingContext2D, img: ImageForCanvas) {
        ctx.drawImage(
            img.image,
            img.point.width - img.width / 2,
            img.point.height - img.height / 2,
            img.width, img.height);
    }

    drawRotateImage(ctx: CanvasRenderingContext2D, img: RotateImageForCanvas) {
        ctx.save();
        img.actualRotateDegree += img.rotateDegree;
        ctx.translate(img.point.width, img.point.height);
        ctx.rotate(img.actualRotateDegree * Math.PI / 180);
        ctx.drawImage(img.image, - img.width / 2, - img.height / 2, img.width, img.height);
        ctx.restore();
    }

    drawKoffing(ctx: CanvasRenderingContext2D, koffing: KoffingOponent) {
        ctx.save();
        koffing.actualRotateDegree += koffing.rotateDegree;
        if(!koffing.isGoingUp) {
            koffing.rotateDegree = koffing.defaultRotateDegree;
            if(Math.floor(koffing.actualRotateDegree) === -180) {
                koffing.actualRotateDegree = -180;
                koffing.rotateDegree = 0;
            }
        }
        if(koffing.isGoingUp) {
            koffing.actualRotateDegree = 0;
        }
        ctx.translate(koffing.point.width, koffing.point.height);
        ctx.rotate(koffing.actualRotateDegree * Math.PI / 180);
        ctx.drawImage(koffing.image, - koffing.width / 2, - koffing.height / 2, koffing.width, koffing.height);
        ctx.restore();
    }

    getRandomColor(): string {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
}