import { BIOME, ToolTip } from "../area";
import { Room } from "../room";

export const VIEW_W = 1920;
export const VIEW_H = 1080;

export const PI2 = Math.PI * 2.0;

const create_canvas = () => {

    const canvas: HTMLCanvasElement | null = document.querySelector("#canvas");

    if (canvas === null) {

        const new_canvas = document.createElement("canvas");
        new_canvas.id = "canvas";
        document.body.prepend(new_canvas);

        return new_canvas;

    }

    return canvas;

};

export class Renderer {

    canvas = create_canvas();
    ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;

    offcvs = new OffscreenCanvas(1, 1);
    offctx = this.offcvs.getContext("2d") as OffscreenCanvasRenderingContext2D;

    scale = 1;

    vw = VIEW_W;
    vh = VIEW_H;

    delta_time = 0;
    delta_min = 0;
    delta_max = 0;

    fps = 1145141919810;
    fps_v: number[] = [];

    mouse_x = 0;
    mouse_y = 0;
    click = false;
    chg_c = false;

    a: ToolTip[] = [];

    time = performance.now();

    yaju = 0;
    senpai = 0;

    constructor() {

        this.canvas.oncontextmenu = event => event.preventDefault();
        this.resize();

        for (const biome of BIOME) {

            this.a.push(
                new ToolTip(
                    biome.name,
                    biome.index,
                    biome.color
                )
            );

        }

    }

    fit() {

        this.ctx.scale(this.scale, this.scale);
        this.offctx.scale(this.scale, this.scale);

    }

    resize() {

        this.canvas.width = innerWidth * devicePixelRatio;
        this.canvas.height = innerHeight * devicePixelRatio;

        this.offcvs.width = this.canvas.width;
        this.offcvs.height = this.canvas.height;

        const s = Math.max(
            this.canvas.width / VIEW_W,
            this.canvas.height / VIEW_H
        );

        this.scale = s;

        this.vw = this.canvas.width / s;
        this.vh = this.canvas.height / s;

    }

    mouse_move(x: number, y: number) {

        this.mouse_x = devicePixelRatio * x;
        this.mouse_y = y * devicePixelRatio;

    }

    chg_cursor(cursor: string) {

        if (this.chg_c) return;

        this.canvas.style.cursor = cursor;
        this.chg_c = true;

    }

    render_repeat_tile(tile: OffscreenCanvas, rx: number, ry: number) {

        for (let x = rx % tile.width - tile.width; x < this.vw; x += tile.width) {

            for (let y = ry % tile.height - tile.height; y < this.vh; y += tile.height) {

                this.ctx.drawImage(tile, x, y);

            }

        }

    }

    loop(
        time: number,

        room: Room
    ) {

        this.delta_time = Math.max(0, time - this.time);
        this.delta_min = 1000;
        this.delta_max = 0;
        this.time = time;

        this.fps_v.push(this.delta_time);
        this.fps = 1000 / (this.fps_v.reduce((a, b) => {

            if (this.delta_min > b) {
                this.delta_min = b;
            }
            
            if (this.delta_max < b) {
                this.delta_max = b;
            }

            return a + b;

        }) / this.fps_v.length);

        if (this.fps_v.length > 120) this.fps_v.shift();

        const {
            canvas,
            ctx
        } = this;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.offctx.clearRect(0, 0, canvas.width, canvas.height);

        this.fit();

        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        const tile = room.tile.get(
            room.biome.name
        );

        if (tile) {

            ctx.globalAlpha = 1;

            const t = time * 0.1;
            
            const rx = -t | 0;
            const ry = Math.sin(t * 0.005) * 128 | 0;

            const bg = room.tile.get(room.biome.bg);

            if (bg) {
                this.render_repeat_tile(bg, rx, ry);
            }

            this.render_repeat_tile(tile, rx, ry);

            const wrap = room.tile.get(room.biome.wrap);

            if (wrap) {
                ctx.globalAlpha = 0.5;

                const t = time * 0.02;

                this.render_repeat_tile(wrap, -t, t);

                ctx.globalAlpha = 1;
            }

        }

        for (let i = 0; i < this.a.length; i++) {

            const tip = this.a[i];

            tip.x = 10;
            tip.y = 10 + i * 50;
            tip.a = 1;

            const clicked = tip.render(ctx, this);

            if (clicked && room.biome.index !== tip.index) {

                room.biome.init();
                room.biome = BIOME[tip.index];

            }

        }

        for (let i = 0; i < room.biome.mobs.length; i++) {

            const mob = room.biome.mobs[i];

            const x = i / 8 | 0;

            mob.x = 250 + x * 400;
            mob.y = 50 + (mob.size + 5) * (i % 8);

            for (let i2 = 0; i2 < mob.petals.length; i2++) {

                const petal = mob.petals[i2];

                if (mob.focus) {
                    petal.x = mob.rx + (petal.size + 5) * (i2 + 1);
                    petal.y = mob.ry;
                    petal.r = 0;
                    petal.a = 1;
                } else {
                    petal.x = mob.rx;
                    petal.y = mob.ry;
                    petal.r = -Math.PI;
                    petal.a = 0;
                }

                const clicked = petal.render(ctx, this, room, mob.focus);

                if ((this.yaju !== i || this.senpai !== i2) && clicked) {

                    const aaaaa = room.biome.mobs[this.yaju]?.petals[this.senpai];

                    aaaaa && (aaaaa.focus = false);
                    this.yaju = i;
                    this.senpai = i2;

                } 

                for (let i3 = 0; i3 < petal.tooltips.length; i3++) {

                    const tip = petal.tooltips[i3];

                    if (petal.focus) {
                        tip.x = 100;
                        tip.y = 10 + i3 * 50;
                        tip.a = 1;
                    } else {
                        tip.x = petal.rx;
                        tip.y = petal.ry;
                        tip.a = 0;
                    }
        
                    const clicked = tip.render(this.offctx, this);

                    if (clicked) {

                        if (tip.name === "Disable") {
                            petal.disabled = !petal.disabled;
                        } else {
                            petal.rarity = tip.index;
                        }

                        petal.rot = -Math.PI;
                        petal.size = 0;
                        petal.focus = false;
                    }
    
                }

            }

            mob.render(ctx, this, room);

        }

        ctx.drawImage(this.offcvs, 0, 0, this.vw, this.vh);

        ctx.fillStyle = "#fff";
        ctx.strokeStyle = "#000";
        ctx.globalAlpha = 1.0;

        const b = `${this.delta_min.toFixed(1)}/${this.delta_time.toFixed(1)}/${this.delta_max.toFixed(1)} ms (min/avg/max) - ${this.fps.toFixed(1)} fps`;

        ctx.translate(
            this.vw - 10,
            this.vh - 5
        );
        ctx.font = "bold 11.5px Ubuntu";
        ctx.textBaseline = "bottom";
        ctx.textAlign = "right";
        ctx.lineWidth = 1.75;
        ctx.strokeText(b, 0, 0);
        ctx.fillText(b, 0, 0);

        ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.offctx.setTransform(1, 0, 0, 1, 0, 0);

        this.chg_cursor("default");

        this.click = false;
        this.chg_c = false;
        
    }

}