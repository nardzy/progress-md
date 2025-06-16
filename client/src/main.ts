
import { md } from "./mod/mdmd";
import {
    Room
} from "./mod/room";
import { Loading } from "./mod/s/loading";
import { Renderer } from "./mod/s/renderer";

const main = async () => {

    const room = new Room;

    await room.load();

    md();

    const renderer = new Renderer;
    const loading = new Loading;

    loading.remove_status();

    addEventListener("resize", () => {

        renderer.resize();

    });

    addEventListener("mousemove", (event) => {

        renderer.mouse_move(
            event.clientX,
            event.clientY
        );

    });

    addEventListener("click", () => {

        renderer.click = true;

    });

    addEventListener("touchstart", (event) => {

        const touch = event.changedTouches[0];

        renderer.mouse_move(
            touch.clientX,
            touch.clientY
        );
        renderer.click = true;

    });

    const render_loop = (time: number) => {

        renderer.loop(
            time,
            room
        );

        requestAnimationFrame(render_loop);

    };

    requestAnimationFrame(render_loop);

};

main();