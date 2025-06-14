export interface Mob { id: number; sid: string; drops: number[] };

export const mobmap: Map<number, Mob> = new Map([
    [
        1,
        {
            "id": 1,
            "sid": "rock",
            "drops": [
                3,
                18,
                77
            ]
        }
    ],
    [
        2,
        {
            "id": 2,
            "sid": "cactus",
            "drops": [
                11
            ]
        }
    ],
    [
        3,
        {
            "id": 3,
            "sid": "ladybug",
            "drops": [
                2,
                5
            ]
        }
    ],
    [
        4,
        {
            "id": 4,
            "sid": "bee",
            "drops": [
                6,
                21,
                14
            ]
        }
    ],
    [
        5,
        {
            "id": 5,
            "sid": "ant_baby",
            "drops": [
                2,
                24,
                22
            ]
        }
    ],
    [
        6,
        {
            "id": 6,
            "sid": "ant_worker",
            "drops": [
                22,
                25
            ]
        }
    ],
    [
        7,
        {
            "id": 7,
            "sid": "ant_soldier",
            "drops": [
                79,
                46
            ]
        }
    ],
    [
        8,
        {
            "id": 8,
            "sid": "ant_queen",
            "drops": [
                51,
                49
            ]
        }
    ],
    [
        9,
        {
            "id": 9,
            "sid": "ant_hole",
            "drops": [
                41,
                73
            ]
        }
    ],
    [
        10,
        {
            "id": 10,
            "sid": "beetle",
            "drops": [
                78,
                16
            ]
        }
    ],
    [
        11,
        {
            "id": 11,
            "sid": "hornet",
            "drops": [
                9,
                50,
                17
            ]
        }
    ],
    [
        12,
        {
            "id": 12,
            "sid": "centipede",
            "drops": [
                22,
                44
            ]
        }
    ],
    [
        14,
        {
            "id": 14,
            "sid": "centipede_evil",
            "drops": [
                7,
                10
            ]
        }
    ],
    [
        16,
        {
            "id": 16,
            "sid": "centipede_desert",
            "drops": [
                23,
                47
            ]
        }
    ],
    [
        18,
        {
            "id": 18,
            "sid": "square",
            "drops": [
                4
            ]
        }
    ],
    [
        19,
        {
            "id": 19,
            "sid": "ladybug_dark",
            "drops": [
                38,
                19
            ]
        }
    ],
    [
        20,
        {
            "id": 20,
            "sid": "ladybug_shiny",
            "drops": [
                5,
                38,
                30
            ]
        }
    ],
    [
        21,
        {
            "id": 21,
            "sid": "spider",
            "drops": [
                12,
                20,
                43
            ]
        }
    ],
    [
        22,
        {
            "id": 22,
            "sid": "scorpion",
            "drops": [
                7,
                27
            ]
        }
    ],
    [
        23,
        {
            "id": 23,
            "sid": "fire_ant_soldier",
            "drops": [
                28,
                58
            ]
        }
    ],
    [
        24,
        {
            "id": 24,
            "sid": "fire_ant_burrow",
            "drops": [
                29,
                72
            ]
        }
    ],
    [
        25,
        {
            "id": 25,
            "sid": "sandstorm",
            "drops": [
                26,
                79,
                45
            ]
        }
    ],
    [
        26,
        {
            "id": 26,
            "sid": "bubble",
            "drops": [
                48,
                13
            ]
        }
    ],
    [
        27,
        {
            "id": 27,
            "sid": "bumble_bee",
            "drops": [
                14,
                96,
                21
            ]
        }
    ],
    [
        28,
        {
            "id": 28,
            "sid": "shell",
            "drops": [
                32,
                36,
                29
            ]
        }
    ],
    [
        29,
        {
            "id": 29,
            "sid": "starfish",
            "drops": [
                31,
                26,
                23
            ]
        }
    ],
    [
        30,
        {
            "id": 30,
            "sid": "crab",
            "drops": [
                35,
                26
            ]
        }
    ],
    [
        31,
        {
            "id": 31,
            "sid": "jellyfish",
            "drops": [
                34,
                33
            ]
        }
    ],
    [
        32,
        {
            "id": 32,
            "sid": "digger",
            "drops": [
                37,
                39
            ]
        }
    ],
    [
        33,
        {
            "id": 33,
            "sid": "sponge",
            "drops": [
                40,
                90
            ]
        }
    ],
    [
        34,
        {
            "id": 34,
            "sid": "leech",
            "drops": [
                42,
                12
            ]
        }
    ],
    [
        36,
        {
            "id": 36,
            "sid": "dandelion",
            "drops": [
                15
            ]
        }
    ],
    [
        37,
        {
            "id": 37,
            "sid": "fire_ant_baby",
            "drops": [
                2,
                28
            ]
        }
    ],
    [
        38,
        {
            "id": 38,
            "sid": "fire_ant_worker",
            "drops": [
                28,
                25
            ]
        }
    ],
    [
        39,
        {
            "id": 39,
            "sid": "fire_ant_queen",
            "drops": [
                51,
                49
            ]
        }
    ],
    [
        40,
        {
            "id": 40,
            "sid": "ant_egg",
            "drops": [
                51
            ]
        }
    ],
    [
        41,
        {
            "id": 41,
            "sid": "fire_ant_egg",
            "drops": [
                51
            ]
        }
    ],
    [
        42,
        {
            "id": 42,
            "sid": "fly",
            "drops": [
                52,
                8,
                68
            ]
        }
    ],
    [
        43,
        {
            "id": 43,
            "sid": "leafbug",
            "drops": [
                22,
                65
            ]
        }
    ],
    [
        44,
        {
            "id": 44,
            "sid": "mantis",
            "drops": [
                44,
                64
            ]
        }
    ],
    [
        45,
        {
            "id": 45,
            "sid": "termite_baby",
            "drops": [
                57,
                53
            ]
        }
    ],
    [
        46,
        {
            "id": 46,
            "sid": "termite_worker",
            "drops": [
                59,
                53
            ]
        }
    ],
    [
        47,
        {
            "id": 47,
            "sid": "termite_soldier",
            "drops": [
                106,
                53
            ]
        }
    ],
    [
        48,
        {
            "id": 48,
            "sid": "termite_overmind",
            "drops": [
                71,
                53,
                60
            ]
        }
    ],
    [
        49,
        {
            "id": 49,
            "sid": "termite_mound",
            "drops": [
                41,
                62,
                53
            ]
        }
    ],
    [
        50,
        {
            "id": 50,
            "sid": "termite_egg",
            "drops": [
                51,
                70
            ]
        }
    ],
    [
        51,
        {
            "id": 51,
            "sid": "bush",
            "drops": [
                56,
                99,
                97
            ]
        }
    ],
    [
        52,
        {
            "id": 52,
            "sid": "roach",
            "drops": [
                17,
                54
            ]
        }
    ],
    [
        53,
        {
            "id": 53,
            "sid": "moth",
            "drops": [
                8,
                55
            ]
        }
    ],
    [
        54,
        {
            "id": 54,
            "sid": "firefly",
            "drops": [
                8,
                55,
                69
            ]
        }
    ],
    [
        55,
        {
            "id": 55,
            "sid": "beetle_hel",
            "drops": [
                67,
                16,
                61
            ]
        }
    ],
    [
        56,
        {
            "id": 56,
            "sid": "wasp",
            "drops": [
                9,
                17,
                63
            ]
        }
    ],
    [
        58,
        {
            "id": 58,
            "sid": "spider_hel",
            "drops": [
                76,
                61,
                43
            ]
        }
    ],
    [
        59,
        {
            "id": 59,
            "sid": "centipede_hel",
            "drops": [
                102,
                61
            ]
        }
    ],
    [
        61,
        {
            "id": 61,
            "sid": "wasp_hel",
            "drops": [
                9,
                75,
                61
            ]
        }
    ],
    [
        63,
        {
            "id": 63,
            "sid": "gambler",
            "drops": [
                80,
                75,
                76,
                67,
                102
            ]
        }
    ],
    [
        65,
        {
            "id": 65,
            "sid": "firefly_magic",
            "drops": [
                69,
                81
            ]
        }
    ],
    [
        67,
        {
            "id": 67,
            "sid": "beetle_nazar",
            "drops": [
                16,
                66,
                92
            ]
        }
    ],
    [
        68,
        {
            "id": 68,
            "sid": "worm",
            "drops": [
                73,
                41
            ]
        }
    ],
    [
        70,
        {
            "id": 70,
            "sid": "mecha_flower",
            "drops": [
                98,
                69,
                93
            ]
        }
    ],
    [
        71,
        {
            "id": 71,
            "sid": "wasp_mecha",
            "drops": [
                95,
                100,
                69
            ]
        }
    ],
    [
        72,
        {
            "id": 72,
            "sid": "spider_mecha",
            "drops": [
                94,
                69
            ]
        }
    ],
    [
        73,
        {
            "id": 73,
            "sid": "leafbug_shiny",
            "drops": [
                65,
                97
            ]
        }
    ],
    [
        74,
        {
            "id": 74,
            "sid": "crab_mecha",
            "drops": [
                101,
                69
            ]
        }
    ],
    [
        76,
        {
            "id": 76,
            "sid": "barrel",
            "drops": [
                94,
                39
            ]
        }
    ],
    [
        77,
        {
            "id": 77,
            "sid": "beetle_mummy",
            "drops": [
                66,
                103,
                16
            ]
        }
    ],
    [
        78,
        {
            "id": 78,
            "sid": "beetle_pharaoh",
            "drops": [
                66,
                103,
                104
            ]
        }
    ],
    [
        79,
        {
            "id": 79,
            "sid": "tomb",
            "drops": [
                66,
                105
            ]
        }
    ]
]);

const i2s: Map<string, number> = new Map;

for (const [id, d] of mobmap) {

    i2s.set(d.sid, id);

}

export const mob_by_sid = (sid: string) => mobmap.get(i2s.get(sid) ?? -1);