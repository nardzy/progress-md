import { type Mob, mob_by_sid } from "./mob";
import { Petal } from "./petal";
import { rarityvec } from "./rarityvec";
import { Room } from "./room";
import { Renderer } from "./s/renderer";
import { darkened, rgb2hex } from "./s/utility";

export class ToolTip {

    x = 0;
    y = 0;
    rx = 0;
    ry = 0;

    alpha = 0;
    a = 0;

    constructor(public name: string, public index: number, public color: string) {

    }

    render(ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D, renderer: Renderer) {

        let clicked = false;

        const f = Math.min(1, renderer.delta_time * 0.005);

        this.rx += (this.x - this.rx) * f;
        this.ry += (this.y - this.ry) * f;
        this.alpha = Math.max(0, this.alpha + (this.a - this.alpha) * f * 3);
        
        ctx.save();
        ctx.translate(this.rx, this.ry);

        ctx.globalAlpha = this.alpha;

        ctx.lineWidth = 10;
        ctx.fillStyle = this.color;
        ctx.strokeStyle = darkened(this.color.substring(1), 0.2);

        const path = new Path2D;

        path.roundRect(0, 0, 80, 40, 5);

        ctx.fill(path);
        ctx.clip(path);
        ctx.stroke(path);

        ctx.fillStyle = "#fff";
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 2;
        ctx.font = "bold 15px Ubuntu";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.strokeText(this.name, 40, 20);
        ctx.fillText(this.name, 40, 20);

        if (this.alpha > 0.8 && ctx.isPointInPath(
            path,
            renderer.mouse_x,
            renderer.mouse_y
        )) {

            renderer.chg_cursor("pointer");

            if (renderer.click) {
                clicked = true;
            }

        }

        ctx.restore();

        return clicked;

    }

}

class VPetal {

    x = 0;
    y = 0;
    rx = 0;
    ry = 0;
    size = 0;
    rot = -Math.PI;
    r = 0;

    alpha = 0;
    a = 0;

    tooltips: ToolTip[] = [];
    rarity = 6;
    count = 1;
    focus = false;
    disabled = false;

    constructor(public id: number) {

        for (let i = 0; i < rarityvec.length; i++) {

            this.tooltips.push(
                new ToolTip(
                    rarityvec[i].name,
                    i,
                    rarityvec[i].color
                )
            );

        }

        this.tooltips.push(
            new ToolTip(
                "Disable",
                114514,
                "#777777"
            )
        );

    }

    render(ctx: CanvasRenderingContext2D, renderer: Renderer, room: Room, fcs: boolean) {

        let clicked = false;

        const f = Math.min(1, renderer.delta_time * 0.01);

        this.rx += (this.x - this.rx) * f;
        this.ry += (this.y - this.ry) * f;
        this.size += (70 - this.size) * f;
        this.rot += (this.r - this.rot) * f;
        this.alpha = Math.max(0, this.alpha + (this.a - this.alpha) * f * 3);

        ctx.save();
        ctx.translate(this.rx, this.ry);

        ctx.globalAlpha = this.alpha;

        const fsize = this.size * .2;
        const hsize = -fsize;

        const {
            name,
            color
        } = rarityvec[this.rarity];

        const ra = color.substring(1);

        ctx.lineWidth = fsize;
        ctx.fillStyle = this.disabled ? darkened(ra, 0.5) : color;
        ctx.strokeStyle = darkened(ra, 0.2);

        const path = new Path2D;

        path.roundRect(hsize, hsize, this.size, this.size, 5);

        ctx.rotate(this.rot);

        ctx.fill(path);

        if (fcs) {

            if (ctx.isPointInPath(
                path,
                renderer.mouse_x,
                renderer.mouse_y
            )) {
    
                renderer.chg_cursor("pointer");
    
                if (renderer.click) {
                    this.focus = true;
                    clicked = true;
                }
    
            }

        } else {
            this.focus = false;
        }

        ctx.clip(path);

        const petal = room.petal.get(this.id);

        petal && ctx.drawImage(petal, hsize, hsize, this.size, this.size);

        ctx.stroke(path);

        ctx.restore();

        return clicked;

    }
    
}

class VMob {

    x = 0;
    y = 0;
    rx = 0;
    ry = 0;
    size = 0;
    rot = -Math.PI;

    petals: VPetal[] = [];
    rarity = 6;
    focus = false;

    constructor(public data: Mob) {

        for (const id of data.drops) {

            this.petals.push(
                new VPetal(
                    id
                )
            );

        }

    }

    render(ctx: CanvasRenderingContext2D, renderer: Renderer, room: Room) {

        const f = Math.min(1, renderer.delta_time * 0.01);

        this.rx += (this.x - this.rx) * f;
        this.ry += (this.y - this.ry) * f;
        this.size += (70 - this.size) * f;
        this.rot += (0 - this.rot) * f;

        ctx.save();

        ctx.translate(this.rx, this.ry);
        ctx.rotate(this.rot);

        const fsize = this.size * .2;
        const hsize = -fsize;

        const {
            name,
            color
        } = rarityvec[this.rarity];

        ctx.lineWidth = fsize;
        ctx.fillStyle = color;
        ctx.strokeStyle = darkened(color.substring(1), 0.2);

        const path = new Path2D;

        path.roundRect(hsize, hsize, this.size, this.size, 10);

        ctx.fill(path);

        if (ctx.isPointInPath(
            path,
            renderer.mouse_x,
            renderer.mouse_y
        )) {

            renderer.chg_cursor("pointer");

            if (renderer.click) {
                this.focus = !this.focus;
            }
            
        }

        ctx.clip(path);

        const mob = room.mob.get(this.data.id);

        mob && ctx.drawImage(mob, hsize, hsize, this.size, this.size);

        ctx.stroke(path);

        ctx.restore();

    }
    
}

class Biome {

    mobs: VMob[] = [];
    bg = "";
    wrap = "";
    color: string;
    constructor(
        public name: string,
        public index: number,
        mob_list: string[],
        rgb: string,
        config?: {
            has_bg?: boolean,
            has_wrap?: boolean
        }
    ) {

        this.color = rgb2hex(rgb);

        if (config?.has_bg) {
            this.bg = `${name}_bg`;
        }

        if (config?.has_wrap) {
            this.wrap = `${name}_wrap`;
        }

        for (const sid of mob_list) {

            const data = mob_by_sid(sid);

            if (data === undefined) {
                throw new Error(`${sid} does not exist.`);
            }

            this.mobs.push(

                new VMob(
                    structuredClone(data)
                )

            );

        }

    }

    init() {

        const refresh: VMob[] = [];
        
        for (const mob of this.mobs) {

            refresh.push(
                new VMob(
                    structuredClone(mob.data)
                )
            );
            
        }

        this.mobs.splice(0);
        this.mobs = refresh;

    }

}

export enum Area {

    Garden = 0,
    Desert = 1,
    Ocean = 2,
    Jungle = 3,
    Hel = 4,

    Ant_Hell = 5,
    Sewers = 6,
    Factory = 7,
    Pyramid = 8

}

const theme = {
    garden: "rgb(30, 167, 97)",
    desert: "rgb(236, 220, 184)",
    ocean: "rgb(78, 119, 167)",
    jungle: "rgb(58, 160, 73)",

    // sub biome
    ant_hell: "rgb(142, 96, 63)",
    sewers: "rgb(102, 102, 51)",
    factory: "rgb(204, 204, 204)",
    pyramid: "rgb(142, 128, 97)"
};

export const BIOME = Array<Biome>(8);

BIOME[Area.Garden] = new Biome(
    "Garden",
    Area.Garden,
    [
        "rock",
        "ladybug",
        "bee",
        "ant_baby",
        "ant_worker",
        "ant_soldier",
        "ant_hole",
        "hornet",
        "centipede",
        "spider",
        "bumble_bee",
        "dandelion"
    ],
    "rgb(30, 167, 97)"
);
BIOME[Area.Desert] = new Biome(
    "Desert",
    Area.Desert,
    [
        "beetle",
        "cactus",
        "centipede_desert",
        "ladybug_shiny",
        "scorpion",
        "fire_ant_burrow",
        "sandstorm",
        "beetle_nazar"
    ],
    "rgb(236, 220, 184)"
);
BIOME[Area.Ocean] = new Biome(
    "Ocean",
    Area.Ocean,
    [
        "bubble",
        "shell",
        "starfish",
        "crab",
        "jellyfish",
        "sponge",
        "leech"
    ],
    "rgb(78, 119, 167)",
    {
        has_wrap: true
    }
);
BIOME[Area.Jungle] = new Biome(
    "Jungle",
    Area.Jungle,
    [
        "centipede_evil",
        "leafbug",
        "mantis",
        "termite_mound",
        "bush",
        "firefly",
        "wasp",
        "firefly_magic",
        "leafbug_shiny"
    ],
    "rgb(58, 160, 73)"
);
BIOME[Area.Hel] = new Biome(
    "Hel",
    Area.Hel,
    [
        "beetle_hel",
        "spider_hel",
        "centipede_hel",
        "wasp_hel",
        "gambler"
    ],
    "rgb(165, 44, 44)"
);
BIOME[Area.Ant_Hell] = new Biome(
    "Ant_Hell",
    Area.Ant_Hell,
    [
        "ant_baby",
        "ant_worker",
        "ant_soldier",
        "ant_queen",
        "ant_egg",

        "fire_ant_baby",
        "fire_ant_worker",
        "fire_ant_soldier",
        "fire_ant_queen",
        "fire_ant_egg",

        "termite_baby",
        "termite_worker",
        "termite_soldier",
        "termite_overmind",
        "termite_egg",

        "worm"
    ],
    "rgb(142, 96, 63)"
);
BIOME[Area.Sewers] = new Biome(
    "Sewers",
    Area.Sewers,
    [
        "spider",
        "fly",
        "roach",
        "moth"
    ],
    "rgb(102, 102, 51)",
    {
        has_bg: true
    }
);
BIOME[Area.Factory] = new Biome(
    "Factory",
    Area.Factory,
    [
        "mecha_flower",
        "wasp_mecha",
        "spider_mecha",
        "crab_mecha",
        "barrel"
    ],
    "rgb(204, 204, 204)"
);
BIOME[Area.Pyramid] = new Biome(
    "Pyramid",
    Area.Pyramid,
    [
        "beetle_mummy",
        "beetle_pharaoh",
        "beetle_nazar",
        "tomb"
    ],
    "rgb(142, 128, 97)"
);