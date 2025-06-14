import { mob_ext } from "./a/a_mob";
import { petal_ext } from "./a/a_petal";
import { tile_ext } from "./a/a_tile";
import { Area, BIOME } from "./area";

export class Room {

    tw = 512;
    th = 512;

    mob: Map<number, OffscreenCanvas> = new Map;
    petal: Map<number, OffscreenCanvas> = new Map;
    tile: Map<string, OffscreenCanvas> = new Map;

    biome = BIOME[Number.parseInt(localStorage.getItem("biome") ?? Area.Ocean.toString()) || 0];

    constructor() {}

    private fn(id: number | string, src: string, w: number, h: number, s: Map<number | string, OffscreenCanvas>) {

        console.log("loading", "id:", id, "src:", src);

        return new Promise(
            (resolve, reject) => {

                const image = new Image(w, h);
    
                image.src = src;
    
                image.onload = () => {

                    console.log(image.width, image.height);
    
                    const canvas = new OffscreenCanvas(
                        w,
                        h
                    );
                    const ctx = canvas.getContext("2d");

                    ctx?.drawImage(image, 0, 0, canvas.width, canvas.height);

                    s.set(id, canvas);

                    resolve(true);
    
                };
    
                image.onerror = (e) => {

                    console.error("load error:", id, e);
    
                    reject(false);
    
                };


            }
        );

    }

    async load() {

        const a = performance.now();

        console.log("start");

        for (const [id, src] of tile_ext) {

            await this.fn(id, src, this.tw, this.th, this.tile);

        }
        for (const [id, src] of mob_ext) {

            await this.fn(id, src, 256, 256, this.mob);

        }
        for (const [id, src] of petal_ext) {

            await this.fn(id, src, 256, 256, this.petal);

        }

        const b = performance.now() - a;

        console.log("end\n", "elapsed:", (b * .001).toFixed(2), "sec");

        return true;

    }

}