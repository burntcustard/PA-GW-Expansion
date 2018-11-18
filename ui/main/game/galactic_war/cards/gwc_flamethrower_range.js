// !LOCNS:galactic_war
define(['shared/gw_common'], function(GW) {
    return {
        type: function() { return 'upgrades'; },
        describe: function(params) {
            return 'Increases the range of flamethrowers by 20%';
        },
        summarize: function(params) {
            return 'Flamethrower range +25%';
        },
        icon: function(params) {
            return 'coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_super_weapons.png';
        },
        audio: function (parms) {
            return {
                found: 'PA/VO/Computer/gw/board_tech_available_weapon_upgrade'
            }
        },
        getContext: function (galaxy) {
            return {
                totalSize: galaxy.stars().length
            };
        },
        deal: function (system, context, inventory) {
            var chance = 0;
            var dist = system.distance();
            if (!inventory.hasCard('gwc_flamethrower_range') &&
                inventory.hasCard('gwc_enable_infernos')) { // Only finadable after infernos
                chance = (dist <= 5) ? 400:0;
            }
            return { chance: chance };
        },
        buff: function(inventory, params) {
            var units = [
                '/pa/units/land/tank_armor/tank_armor.json'
            ];
            _.forEach(units, function(unit) {
                inventory.addMods([
                    {
                        file: unit,
                        path: 'description',
                        op: 'add',
                        value: ' +25% range'
                    }
                ]);
            });

            var weaps = [
                '/pa/units/land/tank_armor/tank_armor_tool_weapon.json'
            ];
            _.forEach(weaps, function(weap) {
                inventory.addMods([
                    {
                    // Range 20 -> 25
                    file: weap,
                    path: 'max_range',
                    op: 'multiply',
                    value: 1.25
                }//,
                //{
                    // // Make the gunships circle around enemies at slightly longer distance.
                    // // May cause issues with non-flamethrower gunships...
                    // file: '/pa/units/air/gunship/gunship.json',
                    // path: 'navigation.aggressive_distance',
                    // op: 'multiply',
                    // value: 1.2
                //}
                ]);
            });
            var effects = [
                '/pa/units/land/tank_armor/tank_armor_muzzle_flame.pfx'
            ];
            _.forEach(effects, function(effect) {
                inventory.addMods([
                    {
                        file: effect,
                        path: 'emitters',
                        op: 'splice',
                        value: 1
                    },
                    {
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
