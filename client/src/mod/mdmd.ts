
type PetalEntries = [name: string, count: number][];

const ORACLE = 253;
const fmt = (
    oracle: number,
    entries: PetalEntries
) => {

    const petals = new Map(entries);

    let name_len = 4;
    let count_len = 5;
    let dif_len = 3;
    let percent_len = 7;

    for (const [name, count] of petals) {

        if (name_len < name.length) {
            name_len = name.length;
        }

        const c = `${count}${oracle}`.length + 3;

        if (count_len < c) {
            count_len = c;
        }

        const d = oracle - count;
        const daaa = `${d < 0 ? "+" : ""}${Math.abs(d).toString()}`;

        const maa = daaa.length;

        if (dif_len < maa) {
            dif_len = maa;
        }

    }

    interface Format {
        a: string,
        b: string,
        c: string,
        d: string
    }

    const r = (count: number) => " ".repeat(Math.max(0, count));
    const a = (count: number) => "-".repeat(Math.max(0, count));
    const s = {
        a: r(name_len - 4),
        b: r(count_len - 5),
        c: r(dif_len - 3),
        d: r(percent_len - 7),
    };
    const n = {
        a: a(name_len),
        b: a(count_len),
        c: a(dif_len),
        d: a(percent_len),
    };

    const format = (
        name: string,
        count: string,
        dif: string,
        percent: string,
        confg: Format
    ) => {

        return `| ${name}${confg.a} | ${count}${confg.b} | ${dif}${confg.c} | ${percent}${confg.d} |\n`;

    };

    let str = "";

    str += `# Sewer Progress \n\n`;

    str += "```bash\n";
    str += format("Name", "Count", "Dif", "Percent", s);
    str += format("", "", "", "", n);

    for (const [name, count] of [...petals.entries()].sort((a, b) => b[1] - a[1])) {

        const percent = `${((count / oracle) * 100).toFixed(2)}%`;
        const c = `${oracle} - ${count}`;
        const d = oracle - count;
        const diff = `${d < 0 ? "+" : ""}${Math.abs(d).toString()}`;

        const confg = {
            a: r(name_len - name.length),
            b: r(count_len - c.length),
            c: r(dif_len - diff.length),
            d: r(7 - percent.length),
        };

        str += format(name, c, diff, percent, confg);

    }

    str += "```\n";

    return str;

};

const imoon = document.createElement("div");

const create_input = (name: string) => {

    const wrap = document.createElement("div");
    const input = document.createElement("input");

    input.style.width = "3em";
    input.value = "0";
    input.name = name;
    input.type = "text";

    wrap.innerHTML += name;
    wrap.appendChild(input);

    imoon.appendChild(wrap);

    return input;

};

const create_out_area = () => {

    const area = document.createElement("textarea");

    area.cols = 40;
    area.rows = 30;
    area.name = "aaaannn";

    imoon.appendChild(area);

    return area;

};

const create_copy_button = () => {

    const b = document.createElement("button");

    b.textContent = "copykisugi";
    b.name = "yajusen";
    imoon.appendChild(b);

    return b;

};

export const md = () => {

    imoon.style.position = "absolute";
    imoon.style.top = "50%";
    imoon.style.left = "50%";
    imoon.style.transform = "translate(-50%, -50%)";
    document.body.appendChild(imoon);

    const oracle = create_input("goal");

    oracle.value = ORACLE.toString();

    const petals = [
        create_input("Antennae"),
        create_input("Bulb"),
        create_input("Lotus"),
        create_input("Faster"),
        create_input("Poo"),
        create_input("Talisman"),
        create_input("Web"),
        create_input("Wing")
    ];

    const copybtn = create_copy_button();

    const area = create_out_area();

    const imo = () => {

        const entries: PetalEntries = [];

        for (const i of petals) {

            const c = Number.parseInt(i.value) || 0;

            if (c === 0) continue;

            entries.push(
                [
                    i.name,
                    c
                ]
            );

        }

        const out = fmt(
            Number.parseInt(oracle.value) || 0,
            entries
        );

        area.value = out;

    };

    oracle.addEventListener("input", () => {
        imo();
    });

    for (const i of petals) {

        i.addEventListener("input", () => {
            imo();
        });

    }

    imo();

    copybtn
    .addEventListener("click", () => {

        if (!navigator.clipboard) {
            alert(`error on navigator.clipboard.writeText\nヌゥン！ヘッ！ヘッ！

ア゛ア゛ア゛ア゛ァ゛ァ゛ァ゛ァ゛

ア゛↑ア゛↑ア゛↑ア゛↑ア゛ア゛ア゛ァ゛ァ゛ァ゛ァ゛！！！！

ウ゛ア゛ア゛ア゛ア゛ア゛ア゛ァ゛ァ゛ァ゛ァ゛ァ゛ァ゛ァ！！！！！

フ ウ゛ウ゛ウ゛ゥ゛ゥ゛ゥ゛ン！！！！

フ ウ゛ゥ゛ゥ゛ゥン！！！！(大迫真)

`);
            return;
        }

        navigator.clipboard?.writeText(
            area.value
        ).then(() => {
            alert("copied to clipboard");
        }).catch(e => {
            alert(`copy error: ${e}`);
        });

    });

};