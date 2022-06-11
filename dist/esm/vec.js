export class Vec {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
        Object.freeze(this);
    }
    static unit() {
        return new Vec(1, 1);
    }
    clone() {
        return new Vec(this.x, this.y);
    }
    add(vec) {
        return new Vec(this.x + vec.x, this.y + vec.y);
    }
    sub(vec) {
        return new Vec(this.x - vec.x, this.y - vec.y);
    }
    mul(s) {
        return new Vec(this.x * s, this.y * s);
    }
    div(d) {
        return new Vec(this.x / d, this.y / d);
    }
    dot(vec) {
        return this.x * vec.x + this.y * vec.y;
    }
    cross(vec) {
        return this.x * vec.y - this.y * vec.x;
    }
    eq(vec) {
        return this.x === vec.x && this.y === vec.y;
    }
    abs() {
        return Math.hypot(this.x, this.y);
    }
    absSquare() {
        return this.x * this.x + this.y * this.y;
    }
    projection(vec) {
        return vec.mul(this.dot(vec) / vec.absSquare());
    }
    unit() {
        const abs = this.abs();
        if (abs === 0)
            throw new Error('len === 0');
        return this.mul(1 / abs);
    }
    centerPoint(target) {
        const sum = this.add(target);
        return new Vec(sum.x / 2, sum.y / 2);
    }
    rev() {
        return new Vec(-this.x, -this.y);
    }
    angle(vec) {
        const cos = this.dot(vec) / (this.abs() * vec.abs());
        const a = Math.acos(cos);
        if (isNaN(a))
            return null;
        const gaiseki = this.cross(vec);
        if (gaiseki > 0) {
            return a;
        }
        else {
            return a * -1;
        }
    }
    normal() {
        return this.rotate(-90);
    }
    isLeft(vec) {
        return this.cross(vec) < 0;
    }
    rotate(deg, origin = new Vec()) {
        const rad = (deg / 180) * Math.PI;
        const x = Math.cos(rad) * this.x -
            Math.sin(rad) * this.y +
            origin.x -
            origin.x * Math.cos(rad) +
            origin.y * Math.sin(rad);
        const y = Math.sin(rad) * this.x +
            Math.cos(rad) * this.y +
            origin.y -
            origin.x * Math.sin(rad) -
            origin.y * Math.cos(rad);
        return new Vec(x, y);
    }
    static vecToVecRotation(vec) {
        const x = vec.x;
        const y = vec.y;
        const r = Math.atan2(y, x);
        return {
            len: vec.abs(),
            rotate: r,
        };
    }
}
