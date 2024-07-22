export class CanvasHelper {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    canvasWidthShift = 0;

    constructor(canvas: HTMLCanvasElement, width: number, height: number) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d')!;
        this.setCanvasSize(width, height);
    }

    private setCanvasSize(width: number, height: number): void {
        this.canvas.width = width;
        this.canvas.height = height;
    }

    getCanvasWidth(): number {
        return this.canvas.width;
    }

    getCanvasHeight(): number {
        return this.canvas.height;
    }

    clearRect(): void {
        this.ctx?.clearRect(0, 0, this.canvas.width + this.canvasWidthShift, this.canvas.height);
    }
}