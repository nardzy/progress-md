export const darkened = (base: string, v: number) => {

    const x = Number.parseInt(base, 16);
    const f = 1 - v;
    const r = (x >>> 16) & 255;
    const g = (x >>> 8) & 255;
    const b = x & 255;
    const out_r = r * f | 0;
    const out_g = g * f | 0;
    const out_b = b * f | 0;
    const blend = (out_r << 16) | (out_g << 8) | out_b;
    const s = blend.toString(16);

    return `#${s.padStart(6, "0")}`;

};

export const rgb2hex = (rgb: string) => {

    const clr = rgb.substring(4, rgb.length - 1).split(",");

    const r = Number.parseInt(clr[0]);
    const g = Number.parseInt(clr[1]);
    const b = Number.parseInt(clr[2]);

    const to = (r << 16) | (g << 8) | b;
    const s = to.toString(16);

    return `#${s.padStart(6, "0")}`;

};

export const easein = (n: number) => {

    const ext = n > .5 ? (
        .5 - ((1 - n) ** 2)
    ) : n ** 2;

    return ext * 2.0;

};