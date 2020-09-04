// !LOCNS:galactic_war
define(['shared/gw_common'], function(GW) {
    return {
        type: 'upgrades',
        describe: 'Increases the range of flamethrowers by ＋⁠40%',
        summarize: 'Flamethrower Range Tech',
        icon: 'coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_super_weapons.png',
        audio: 'PA/VO/Computer/gw/board_tech_available_weapon_upgrade',
        deal: function(system, context, inventory) {
            var chance = 0;
            var dist = system.distance();
            if (!inventory.hasCard('gwc_flamethrower_range')) {
                chance = (dist <= 5) ? 40 : 0;
            }
            return { chance: chance };
        },
        buff: function(inventory) {
            var units = [
                '/pa/units/land/tank_armor/tank_armor.json'
            ];
            _.forEach(units, function(unit) {
                inventory.addMods([
                    {
                        file: unit,
                        path: 'description',
                        op: 'add',
                        value: ' Flamethrower Tech: ＋⁠40% range.'
                    }
                ]);
            });

            var weaps = [
                '/pa/units/land/tank_armor/tank_armor_tool_weapon.json'
            ];
            _.forEach(weaps, function(weap) {
                inventory.addMods([
                    {
                        // Range 20 -> 28
                        file: weap,
                        path: 'max_range',
                        op: 'multiply',
                        value: 1.4
                    }
                ]);
            });

            var effects = [
                '/pa/units/land/tank_armor/tank_armor_muzzle_flame.pfx'
            ];
            _.forEach(effects, function(effect) {
                inventory.addMods([
                    {
                        // Remove the original flames effect
                        file: effect,
                        path: 'emitters',
                        op: 'splice',
                        value: 1
                    },
                    {
                        // Add in longer flames effect
                        file: effect,
                        path: 'emitters',
                        op: 'push',
                        value: {
                            "bLoop": false,
                            "drag": 0.92,
                            "emissionBursts": 1,
                            "emissionRate": 70,
                            "emitterLifetime": 0.6,
                            "endDistance": 3200,
                            "gravity": 25,
                            "lifetime": 1,
                            "sizeRangeY": 1.5,
                            "sizeX": 2,
                            "sizeY": 3.5,
                            "spec": {
                                "baseTexture": "/pa/effects/textures/particles/flamethrower.papa",
                                "blue": {
                                    "keys": [
                                        [
                                            0,
                                            2
                                        ],
                                        [
                                            0.2,
                                            0.2
                                        ],
                                        [
                                            0.65,
                                            0.01
                                        ]
                                    ]
                                },
                                "dataChannelFormat": "PositionColorAndAlignVector",
                                "facing": "velocity",
                                "green": {
                                    "keys": [
                                        [
                                            0,
                                            2
                                        ],
                                        [
                                            0.2,
                                            0.6
                                        ],
                                        [
                                            0.65,
                                            0.05
                                        ]
                                    ]
                                },
                                "red": {
                                    "keys": [
                                        [
                                            0,
                                            2
                                        ],
                                        [
                                            0.2,
                                            2
                                        ],
                                        [
                                            0.65,
                                            1.5
                                        ]
                                    ]
                                },
                                "shader": "particle_transparent",
                                "size": {
                                    "keys": [
                                        [
                                            0,
                                            0.75
                                        ],
                                        [
                                            0.5,
                                            1.25
                                        ],
                                        [
                                            1,
                                            0
                                        ]
                                    ]
                                }
                            },
                            "useWorldSpace": true,
                            "velocity": 85,
                            "velocityRange": 30,
                            "velocityRangeX": 0.07,
                            "velocityRangeZ": 0.07,
                            "velocityY": -1
                        }
                    }
                ]);
            });

        }
    };
});
